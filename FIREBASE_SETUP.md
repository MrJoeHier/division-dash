# Student accounts and the public scoreboard (Firebase)

Out of the box, **Man vs. Math** saves everything in the browser (`localStorage`) on each device, and students type
"Sam T." to play. Nothing changes until you paste a Firebase config into `index.html`.

Once a config is in, the start screen becomes:

- **Sign in** / **Create account** with your **first name and last initial** (e.g. Sam T. or Mister H.) and a
  **password**. That name is what everyone sees on the scoreboard (2–16 letters, numbers, spaces or a period,
  run through a bad-word filter). Sign-in is not picky about capitalization or punctuation: "Sam T.", "sam t"
  and "SAM T" are the same account.
- **Play as guest**: progress stays on that device. The next time someone signs in on that device, the guest
  progress is added to their account.
- A **public scoreboard** anyone can see (signed in or not). It shows only that name, levels cleared
  and furthest episode. Never emails or passwords.
- Progress follows the student to any device. If the internet drops mid-game, saves are kept on the device and
  sent when the connection comes back. If Firebase can't be reached at all, guest play still works.
- The **Teacher** button opens a screen where you sign in with your teacher account to **rename**, **hide/show**
  or **remove** any student's scoreboard entry and export a CSV. (When Firebase is not set up, Teacher instead
  uses a device PIN and a roster saved on that device.)

Behind the scenes, a name like `Sam T.` or `Mister H.` is stored as a Firebase username (`sam_t`, `mister_h`)
and signs in as `sam_t@mvm.local`. That address is never shown, can't receive mail, and isn't stored anywhere else.
An older account created with a plain username such as `mrhier` can still sign in by typing that username.

---

## 1. Create the Firebase project (about 10 minutes, free Spark plan)

1. Go to <https://console.firebase.google.com> and sign in with your Google account.
2. **Create a project** → name it `man-vs-math` → turn **Google Analytics off** → **Create project**.
3. Left menu **Build → Authentication → Get started** → **Sign-in method** tab → **Email/Password** →
   turn on the first switch (**Email/Password**, *not* "Email link") → **Save**.
4. Left menu **Build → Firestore Database → Create database** → **Standard edition** if asked → location closest
   to you (e.g. `nam5 (United States)`) → **Start in production mode** → **Create**.
5. Firestore **Rules** tab → delete what's there → paste the entire contents of
   [`firebase/firestore.rules`](firebase/firestore.rules) → **Publish**.
6. Gear icon **⚙ → Project settings → General** → scroll to **Your apps** → click the **`</>`** (Web) icon →
   nickname `game` → leave "Firebase Hosting" unchecked → **Register app**. Firebase shows a
   `const firebaseConfig = { ... }` block. Copy the values for `apiKey`, `authDomain`, `projectId` and `appId`.

## 2. Paste the config into the game

Open `index.html`, search for `FIREBASE_CONFIG`, and fill it in (keep the quotes):

```js
const FIREBASE_CONFIG = {
  apiKey: "AIza…",
  authDomain: "man-vs-math.firebaseapp.com",
  projectId: "man-vs-math",
  appId: "1:…:web:…"
};
```

These values aren't secret: every web app sends them to the browser. The **Firestore rules** protect the data.
Commit and push. The start screen then shows **Sign in / Create account**.

## 3. Make your teacher account

1. Open the game and **Create account** with your name (e.g. `Mister H.`) and a strong password.
   (If you already created a teacher account with a username like `mrhier`, you can keep using that.)
2. Firebase console → **Authentication → Users** → copy the **User UID** of the matching address
   (`mister_h@mvm.local`, or `mrhier@mvm.local` for an older username).
3. **Firestore Database → Data → + Start collection** → Collection ID `admins` → **Next** →
   Document ID: paste the UID → add a field `note` (string) `teacher` → **Save**.
4. In the game tap **Teacher** → sign in with that same name (or your older username) and your password.

The teacher account plays like any other account. To keep yourself off the scoreboard, tap **Hide** next to your name.

## What the rules enforce

| Data | Who can read | Who can write |
|---|---|---|
| `users/{uid}`: username, scoreboard name, episode/level, strength, levels passed | that student, teacher | that student only (fields and ranges checked; username must match the sign-in) |
| `leaderboard/{uid}`: scoreboard name, levels (0–12), furthest episode (1–3), done, `hidden`, `modName` | **everyone** (rows not hidden) | that student (can't unhide or undo a teacher rename); the teacher can change only `hidden` / `modName` |
| `events/{id}`: "passed Level 3" alerts (uid, episode, level, time) | signed-in players | signed-in players, their own uid only |
| `admins/{uid}` | only that account (to check "am I a teacher?") | nobody from the game (console only) |

## Day-to-day

- **Bad or unkind name:** Teacher → **Rename** (sets what the board shows) or **Hide** (removes it from the public board).
  The student can't change either back.
- **Remove** deletes a student's saved progress and scoreboard row. They can sign in again and start over.
  To block an account completely: Firebase console → Authentication → Users → ⋮ → **Disable account**.
- **Forgotten password:** there's no email to reset it. The student makes a new account (you can Hide the old row),
  or you delete the old user in Authentication → Users so they can re-register the same name.
- **Forgot the teacher PIN (only when Firebase is not set up):** the PIN lives only on that device. Open the game
  with `?dev=1` at the end of the address and tap **Clear teacher PIN** in the DEV bar, then tap Teacher to make a
  new one. With online accounts turned on, Teacher uses your teacher name and password, not a device PIN.

## Testing locally (optional, for developers)

Rules tests and the game both run against the Firebase emulators (needs Node 18+ and Java 11+):

```sh
cd firebase/tests && npm install && npm test          # security-rules tests
cd firebase && npx firebase emulators:start --only auth,firestore --project demo-mvm
# serve the site (e.g. python3 -m http.server 8123) and open http://127.0.0.1:8123/?emu=1
```

`?emu=1` only works on `localhost` / `127.0.0.1`; the live site ignores it.

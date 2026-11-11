# Student accounts and the public scoreboard (Firebase)

Out of the box, **Man vs. Math** saves everything in the browser (`localStorage`) on each device, and students type
"Sam T." to play. Nothing changes until you paste a Firebase config into `index.html`.

Once a config is in, the start screen becomes:

- **Sign in** / **Create account** with a **username + password** (no email needed). Students also pick a
  **scoreboard name** (a nickname, 2–16 letters or numbers, run through a bad-word filter).
- **Play as guest**: progress stays on that device. The next time someone signs in on that device, the guest
  progress is added to their account.
- A **public scoreboard** anyone can see (signed in or not). It shows only the scoreboard name, levels cleared
  and furthest episode. Never usernames, emails or real names.
- Progress follows the student to any device. If the internet drops mid-game, saves are kept on the device and
  sent when the connection comes back. If Firebase can't be reached at all, guest play still works.
- The **Teacher** button (PIN on each device, stored only as a salted hash) opens a screen where you sign in with
  your teacher account to **rename**, **hide/show** or **remove** any student's scoreboard entry and export a CSV.

Behind the scenes, a username like `sam_t` signs in to Firebase as `sam_t@mvm.local`. That address is never shown,
can't receive mail, and isn't stored anywhere else.

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

1. Open the game and **Create account** with a username for yourself (e.g. `mrhier`) and a strong password.
2. Firebase console → **Authentication → Users** → copy the **User UID** of `mrhier@mvm.local`.
3. **Firestore Database → Data → + Start collection** → Collection ID `admins` → **Next** →
   Document ID: paste the UID → add a field `note` (string) `teacher` → **Save**.
4. In the game tap **Teacher** → create (or enter) the device PIN → sign in with `mrhier` and your password.

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
  or you delete the old user in Authentication → Users so they can re-register the same username.
- **Forgot the teacher PIN:** it lives only on that device. Open the game with `?dev=1` at the end of the address
  and tap **Clear teacher PIN** in the DEV bar, then tap Teacher to make a new one.

## Testing locally (optional, for developers)

Rules tests and the game both run against the Firebase emulators (needs Node 18+ and Java 11+):

```sh
cd firebase/tests && npm install && npm test          # security-rules tests
cd firebase && npx firebase emulators:start --only auth,firestore --project demo-mvm
# serve the site (e.g. python3 -m http.server 8123) and open http://127.0.0.1:8123/?emu=1
```

`?emu=1` only works on `localhost` / `127.0.0.1`; the live site ignores it.

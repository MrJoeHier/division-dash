# Sharing student progress across devices (Firebase)

Out of the box, **Man vs. Math** saves everything in the browser's `localStorage`: students, saved games,
the leaderboard, the "passed a level" alerts and the teacher PIN hash. That works right away, but only **per device**:
a student who plays on iPad 3 won't see their save on iPad 5, and alerts only show for events on the same device.

To share all of that across the class, connect a free **Firebase Realtime Database**. The game already includes the
code for it. It switches over automatically as soon as `FIREBASE_CONFIG` in `index.html` is filled in.

---

## 1. Create the project (about 10 minutes, free "Spark" plan)

1. Go to <https://console.firebase.google.com> and sign in with your Google account.
2. **Add project**, then name it (e.g. `man-vs-math`). Google Analytics isn't needed, so turn it off. Click **Create**.
3. In the left menu: **Build → Realtime Database → Create database**.
   - Location: the one closest to you (e.g. `us-central1`).
   - Start in **locked mode**. You'll paste rules in step 3.
4. Copy the database URL shown at the top of the Data tab, e.g.
   `https://man-vs-math-default-rtdb.firebaseio.com`.
5. **Project settings** (gear icon) → **General** → *Your apps* → click the **`</>` (Web)** icon.
   Name it `game` (no Hosting needed) and click **Register app**. Firebase shows a `firebaseConfig = { ... }` block.

## 2. Paste the config into the game

Open `index.html`, search for `FIREBASE_CONFIG` and fill it in:

```js
const FIREBASE_CONFIG = {
  apiKey: "AIza…",
  authDomain: "man-vs-math.firebaseapp.com",
  databaseURL: "https://man-vs-math-default-rtdb.firebaseio.com",
  projectId: "man-vs-math",
  appId: "1:…:web:…"
};
const FIREBASE_OPTIONS = { auth: false };   // see step 3 for when to set this to true
```

These values aren't secret: every web app ships them to the browser. The **database rules** below protect the data.
Commit and push. The login screen then says *"Progress is shared online with your class."*

Data layout the game uses:

| Path | What it holds |
|---|---|
| `players/{id}` | one record per student: `name` ("Sam T."), `episode`, `level` (next level), `strength`, `unlocked`, `passed` (`"0-2": timestamp` = Episode 1 Level 3), `done`, `ts` (last played), `created`, and `uid` when sign-in is on |
| `events/{pushId}` | one per level passed: `{ id, pid, name, ep, lv, ts }`. Every logged-in player gets an `onChildAdded` listener for events newer than their login, which shows the "Sam T. passed Level 3 of Episode 1." toast |
| `config/teacherPinHash` | `{ salt, hash, v, ts }`, a salted SHA-256 of the teacher PIN. The PIN itself is never stored |

## 3. Database rules

Paste one of these into **Realtime Database → Rules** and click **Publish**.

### Option A: simple (no sign-in; fine to get started)

Anyone with the game link can read and write progress and push alerts, but nobody can **delete** students, wipe
alerts or change the PIN from the game. Do those from the Firebase console (Data tab), or switch to Option B.
Keep `FIREBASE_OPTIONS = { auth: false }`.

```json
{
  "rules": {
    ".read": false,
    "players": {
      ".read": true,
      "$id": {
        ".write": "newData.exists()",
        ".validate": "newData.hasChildren(['name','episode','level','strength','ts']) && newData.child('name').isString() && newData.child('name').val().length <= 30"
      }
    },
    "events": {
      ".read": true,
      ".indexOn": ["ts", "pid"],
      "$e": { ".write": "!data.exists() && newData.exists()", ".validate": "newData.hasChildren(['name','ep','lv','ts'])" }
    },
    "config": {
      ".read": true,
      "teacherPinHash": { ".write": "!data.exists()" }
    }
  }
}
```

In Option A the teacher screen's **Remove**, **Clear alerts** and **Reset** buttons show a "permission denied" message
by design. *Test mode* (`".read": true, ".write": true` everywhere) would also work, but anyone with the link could
then wipe the data, and Firebase turns test mode off after 30 days. Option A is the safer "simple" choice.

### Option B: recommended (students write only their own record; deletes and resets are teacher-only)

1. **Build → Authentication → Get started**, then enable these two sign-in methods:
   - **Anonymous**: each device signs in silently, so students still just type "Sam T.", with no passwords.
   - **Google**: the teacher's account.
2. Authentication → **Settings → Authorized domains**: add `mrjoehier.github.io`.
3. In `index.html` set `const FIREBASE_OPTIONS = { auth: true };`.
4. Replace `jhier@i5design.com` below if you'll sign in as the teacher with a different Google account. Then publish:

```json
{
  "rules": {
    ".read": false,
    "players": {
      ".read": "auth != null",
      "$id": {
        ".write": "auth != null && ((newData.exists() && (!data.exists() || !data.child('uid').exists() || data.child('uid').val() === auth.uid) && newData.child('uid').val() === auth.uid) || auth.token.email === 'jhier@i5design.com')",
        ".validate": "newData.hasChildren(['name','episode','level','strength','ts']) && newData.child('name').isString() && newData.child('name').val().length <= 30"
      }
    },
    "events": {
      ".read": "auth != null",
      ".indexOn": ["ts", "pid"],
      ".write": "auth.token.email === 'jhier@i5design.com'",
      "$e": { ".write": "auth != null && !data.exists() && newData.exists()", ".validate": "newData.hasChildren(['name','ep','lv','ts'])" }
    },
    "config": {
      ".read": "auth != null",
      ".write": "auth.token.email === 'jhier@i5design.com'"
    }
  }
}
```

What this enforces:

- **A student's device can create and update only the records it created** (`uid` = that device's anonymous sign-in),
  plus claim a record the teacher added ahead of time (no `uid` yet) the first time that student plays. It can never delete a record.
- **Anyone signed in can push a new alert**, but can't edit or remove existing ones.
- **Only the teacher's Google account** can remove students, clear alerts, reset everything, edit any record
  (rename, add ahead of time) and set the PIN. On the Teacher screen, tap **Sign in with Google** first.

The trade-off: the anonymous sign-in belongs to the **device and browser**, not the student. With shared iPads,
students on the same iPad can update each other's records, and a student who moves to a different iPad can read
their save but can't write to it until the teacher re-adds or renames them from that device. If students mostly
stay on one iPad, this works well. If they move around a lot, Option A is simpler.

## 4. Teacher PIN

- The **first** time someone taps **Teacher** on the login screen, they create the PIN (4–8 digits, typed twice).
  Only a salted SHA-256 hash is saved: in `localStorage` (`mvm.teacherPin.v1`) and, with Firebase on, at
  `config/teacherPinHash`. No PIN is written into the code.
- In Option B the PIN can only be saved to Firebase by the teacher's Google account. Set Firebase up, open the
  Teacher screen on your own device, sign in with Google, then create the PIN.

### Forgot the PIN?

- **Without Firebase (this device only):** open the game with `?dev=1` at the end of the address
  (e.g. `https://mrjoehier.github.io/division-dash/?dev=1`). In the small DEV bar at the bottom-left, tap
  **Clear teacher PIN**. The next tap on **Teacher** asks you to create a new PIN.
  You could also clear the site's data in the browser settings, but that erases the students too.
- **With Firebase:** in the Firebase console open **Realtime Database → Data**, hover `config → teacherPinHash`
  and click the 🗑 (delete). The next Teacher visit creates a new PIN. In Option A the DEV bar can't clear it,
  because the rules block deletes. In Option B it works only when you're signed in with your Google account.

## 5. Checking it works

1. Open the game on two devices and log in as two different students.
2. Pass a level on one device. Within a second or two, the other shows *"Sam T. passed Level 1 of Episode 1."*
3. The leaderboard on the login screen and the 🏆 button on the map list both students.
4. In the Firebase console, **Data** shows `players` and `events` filling in.

If Firebase can't load (offline, typo in the config), the game logs a warning and falls back to saving on the device,
so class can continue.

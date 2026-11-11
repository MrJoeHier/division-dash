// Security-rules tests. Run from firebase/tests:  npm i && npx firebase emulators:exec --only firestore --project demo-mvm "node --test"
import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, query, where, addDoc } from "firebase/firestore";

let env;
const prog = (u, extra) => Object.assign({ username: u, name: "Sam the Brave", episode: 0, level: 1, strength: 70, unlocked: 1, passed: { "0-0": 1700000000000 }, done: false, ts: 1700000000001, created: 1700000000000 }, extra || {});
const entry = extra => Object.assign({ name: "Sam the Brave", levels: 1, furthest: 1, done: false, ts: 1700000000001, hidden: false, modName: null }, extra || {});
const as = (uid, user) => env.authenticatedContext(uid, { email: user + "@mvm.local" }).firestore();

before(async () => {
  env = await initializeTestEnvironment({ projectId: "demo-mvm", firestore: { rules: readFileSync(new URL("../firestore.rules", import.meta.url), "utf8"), host: "127.0.0.1", port: 8080 } });
});
after(async () => { await env.cleanup(); });
beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async c => {
    const db = c.firestore();
    await setDoc(doc(db, "admins/teach"), { note: "Mr. Hier" });
    await setDoc(doc(db, "users/bob"), prog("bob", { name: "Bobcat" }));
    await setDoc(doc(db, "leaderboard/bob"), entry({ name: "Bobcat" }));
    await setDoc(doc(db, "leaderboard/hid"), entry({ name: "Hidden One", hidden: true }));
  });
});

test("students create and update only their own progress", async () => {
  const sam = as("sam", "sam_t");
  await assertSucceeds(setDoc(doc(sam, "users/sam"), prog("sam_t")));
  await assertSucceeds(setDoc(doc(sam, "users/sam"), prog("sam_t", { level: 2 })));
  await assertFails(setDoc(doc(sam, "users/bob"), prog("sam_t")));
  await assertFails(getDoc(doc(sam, "users/bob")));
  await assertSucceeds(getDoc(doc(sam, "users/sam")));
  await assertFails(getDocs(collection(sam, "users")));
  await assertFails(deleteDoc(doc(sam, "users/sam")));
});

test("progress must match the signed-in username and stay valid", async () => {
  const sam = as("sam", "sam_t");
  await assertFails(setDoc(doc(sam, "users/sam"), prog("bob")));               // someone else's username
  await assertFails(setDoc(doc(sam, "users/sam"), prog("sam_t", { email: "x@y.z" })));  // extra field
  await assertFails(setDoc(doc(sam, "users/sam"), prog("sam_t", { level: 9 })));
  await assertFails(setDoc(doc(sam, "users/sam"), prog("sam_t", { name: "x".repeat(17) })));
  await assertFails(setDoc(doc(sam, "users/sam"), prog("sam_t", { passed: { "7-7": 1 } })));
});

test("guests (not signed in) can read the public scoreboard but not write or read private data", async () => {
  const anon = env.unauthenticatedContext().firestore();
  const snap = await assertSucceeds(getDocs(query(collection(anon, "leaderboard"), where("hidden", "==", false))));
  assert.deepEqual(snap.docs.map(d => d.id), ["bob"]);
  assert.deepEqual(Object.keys(snap.docs[0].data()).sort(), ["done", "furthest", "hidden", "levels", "modName", "name", "ts"]);
  await assertFails(getDocs(collection(anon, "leaderboard")));                // unfiltered list could include hidden rows
  await assertFails(getDoc(doc(anon, "leaderboard/hid")));
  await assertFails(getDoc(doc(anon, "users/bob")));
  await assertFails(setDoc(doc(anon, "leaderboard/x"), entry()));
  await assertFails(getDocs(collection(anon, "events")));
});

test("students write only their own scoreboard row, and can't unhide or undo a teacher rename", async () => {
  const sam = as("sam", "sam_t");
  await assertSucceeds(setDoc(doc(sam, "leaderboard/sam"), entry()));
  await assertSucceeds(setDoc(doc(sam, "leaderboard/sam"), { levels: 2, ts: 1700000000002 }, { merge: true }));
  await assertFails(setDoc(doc(sam, "leaderboard/sam"), { levels: 99 }, { merge: true }));
  await assertFails(setDoc(doc(sam, "leaderboard/bob"), { levels: 12 }, { merge: true }));
  await assertFails(setDoc(doc(sam, "leaderboard/sam2"), entry({ hidden: true })));
  await assertFails(setDoc(doc(as("new", "new_kid"), "leaderboard/new"), entry({ modName: "Sneaky" })));
  const bob = as("bob", "bob");
  await env.withSecurityRulesDisabled(c => updateDoc(doc(c.firestore(), "leaderboard/bob"), { hidden: true, modName: "Student 7" }));
  await assertFails(setDoc(doc(bob, "leaderboard/bob"), { hidden: false }, { merge: true }));
  await assertFails(setDoc(doc(bob, "leaderboard/bob"), { modName: null }, { merge: true }));
  await assertSucceeds(setDoc(doc(bob, "leaderboard/bob"), { levels: 3, name: "Bobcat", ts: 1700000000009 }, { merge: true }));
  await assertSucceeds(getDoc(doc(bob, "leaderboard/bob")));                 // can still see their own hidden row
});

test("teacher can rename, hide, read all and remove; nothing else", async () => {
  const t = as("teach", "mrhier");
  await assertSucceeds(updateDoc(doc(t, "leaderboard/bob"), { modName: "Student 7" }));
  await assertSucceeds(updateDoc(doc(t, "leaderboard/bob"), { hidden: true }));
  await assertFails(updateDoc(doc(t, "leaderboard/bob"), { levels: 12 }));
  await assertFails(updateDoc(doc(t, "leaderboard/bob"), { modName: "f" }));
  await assertSucceeds(getDocs(collection(t, "leaderboard")));
  await assertSucceeds(getDocs(collection(t, "users")));
  await assertSucceeds(deleteDoc(doc(t, "leaderboard/hid")));
  await assertSucceeds(deleteDoc(doc(t, "users/bob")));
  await assertFails(setDoc(doc(t, "admins/sam"), { x: 1 }));
  await assertFails(setDoc(doc(as("sam", "sam_t"), "admins/sam"), { x: 1 }));
  await assertFails(updateDoc(doc(as("sam", "sam_t"), "leaderboard/bob"), { hidden: true }));
});

test("events: signed-in players add their own alert only", async () => {
  const sam = as("sam", "sam_t");
  await assertSucceeds(addDoc(collection(sam, "events"), { uid: "sam", ep: 0, lv: 1, ts: 1700000000003 }));
  await assertFails(addDoc(collection(sam, "events"), { uid: "bob", ep: 0, lv: 1, ts: 1 }));
  await assertFails(addDoc(collection(sam, "events"), { uid: "sam", ep: 0, lv: 1, ts: 1, name: "Bad Name" }));
  await assertSucceeds(getDocs(query(collection(sam, "events"), where("ts", ">", 0))));
});

test("only a teacher's own admins doc is readable", async () => {
  await assertSucceeds(getDoc(doc(as("teach", "mrhier"), "admins/teach")));
  await assertSucceeds(getDoc(doc(as("sam", "sam_t"), "admins/sam")));   // reads "doesn't exist"
  await assertFails(getDoc(doc(as("sam", "sam_t"), "admins/teach")));
});

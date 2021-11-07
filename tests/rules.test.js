const {setup, teardown} = require('./helpers')
import {
  assertFails,
  assertSucceeds,
} from "@firebase/rules-unit-testing"
import {setDoc,doc} from "firebase/firestore"
const { readFileSync } = require('fs');



describe("Signing up and registering", () => {
  let app;
  let alice;
  let aliceDb;
  // Setup
  beforeAll(async () => {
    app = await setup();

    alice = await app.authenticatedContext("alice",{
      displayName: "Alice",
      photoURL : "http://photoURL.com",
    })
    aliceDb = await app.authenticatedContext('alice').firestore()
    teardown()
  })

  test("Deny create profile because it spoofs its id", async () =>{
    await assertFails(setDoc(doc(aliceDb, `users/${alice.authToken.user_id}/privateInfo/data`), {
      uid: "some random auth token",
    }));
  })

  test("Allow creating profile with valid fields", async () => {
    await assertSucceeds(setDoc(doc(aliceDb, `users/${alice.authToken.user_id}/privateInfo/data`), {
      displayName: alice.authToken.displayName,
      photoURL: alice.authToken.photoURL,
      uid: alice.authToken.user_id,
    }));
  });

  test("Allow updating profile", async () => {
    await assertSucceeds(setDoc(doc(aliceDb, `users/${alice.authToken.user_id}/privateInfo/data`), {
      displayName: "Bob",
      photoURL: alice.authToken.photoURL,
      uid: alice.authToken.user_id,
    }));
  })

  test("Deny updating profile because it tries to use different uid", async () =>{
    await assertFails(setDoc(doc(aliceDb, `users/${alice.authToken.user_id}/privateInfo/data`), {
      displayName: alice.authToken.displayName,
      photoURL: alice.authToken.photoURL,
      uid: "spoofed token",
    }));
  })
})
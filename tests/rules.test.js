const {setup, teardown} = require('./helpers')
import {
  assertFails,
  assertSucceeds,
} from "@firebase/rules-unit-testing"
import {setDoc,doc} from "firebase/firestore"
const { readFileSync } = require('fs');



describe("Database rule", () => {
  let app;
  let alice;
  let aliceDb;
  beforeAll(async () => {
    app = await setup();

    alice = await app.authenticatedContext("alice",{
      displayName: "Alice",
      photoURL : "http://photoURL.com",
    })
    aliceDb = await app.authenticatedContext('alice').firestore()
  })

  test("Allow create profile with valid fields", async () => {
    
    await assertSucceeds(setDoc(doc(aliceDb, `users/${alice.authToken.user_id}/privateInfo/data`), {
      displayName: alice.authToken.displayName,
      photoURL: alice.authToken.photoURL,
      uid: alice.authToken.user_id,
    }));
  });

  test("Deny create profile because it spoofs its id", async () =>{
    await assertFails(setDoc(doc(aliceDb, `users/${alice.authToken.user_id}/privateInfo/data`), {
      uid: "some random auth token",
    }));
  })

})
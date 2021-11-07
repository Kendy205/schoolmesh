import {
  initializeTestEnvironment,
  clearFirestoreData
} from "@firebase/rules-unit-testing"
const { readFileSync } = require('fs');
const axios = require('axios');

module.exports.setup = async () => {
  const projectId = `mesh-demo`;
  const testEnv = await initializeTestEnvironment({
    projectId: projectId,
    firestore: {
      rules: readFileSync("firestore.rules", "utf8"),
      host: "localhost",
      port: 8080
    },  
  });

  return testEnv
};

module.exports.teardown = async () => {
  const options ={
    url : "http://localhost:8080/emulator/v1/projects/firestore-emulator-example/databases/(default)/documents",
  }
  await axios.delete(options.url)
};
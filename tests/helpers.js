import {
  initializeTestEnvironment,
  clearFirestoreData
} from "@firebase/rules-unit-testing"
const { readFileSync } = require('fs');

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
  await clearFirestoreData();
};
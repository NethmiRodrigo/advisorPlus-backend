//Configuring firebase admin and initialization
const admin = require("firebase-admin");
const serviceAccount = require("../config/dev-hackathon-11f94-firebase-adminsdk-h7t6q-fb2a87211a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { admin };

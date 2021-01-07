//Configuring firebase admin and initialization
const admin = require("firebase-admin");
const serviceAccount = require("../config/dev-hackathon-11f94-firebase-adminsdk-h7t6q-fb2a87211a.json");
const config = require("../config/fb_config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: config.storageBucket,
});

module.exports = { admin };

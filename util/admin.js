//Configuring firebase admin and initialization
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");


const config = require("../config/fb_config");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: config.storageBucket,
});

module.exports = { admin };

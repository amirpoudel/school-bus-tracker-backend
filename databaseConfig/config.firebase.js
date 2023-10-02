const admin = require('firebase-admin');
const serviceAccount = require("../firebaseAccount.json");

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:"https://school-bus-tracker-19436-default-rtdb.asia-southeast1.firebasedatabase.app"
})

const db = admin.database();
module.exports = db;
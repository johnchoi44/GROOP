/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onCall} = require("firebase-functions/v2/https");
const {getAuth} = require("firebase-admin/auth");
var admin = require("firebase-admin");
const logger = require("firebase-functions/logger");
const {getDatabase} =  require("firebase-admin/database");
admin.initializeApp();


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addUserToDB = onCall((request) => {
    const db = getDatabase();
    const usersRef = db.ref("users/");

    const uid = request.data.uid;
    const email = request.data.email;
    const username = request.data.username;

    usersRef.child(uid).set({
        email: email,
        username: username
    });

    return "success";
});

const functions = require('firebase-functions');

exports.generateIcebreaker = functions.https.onRequest((req, res) => {
    const hobby = req.body.hobby;
    // Generate icebreaker prompt based on the hobby (implement your logic here)
    const icebreaker = `Tell me more about your hobby: ${hobby}`;
    res.status(200).json({ prompt: icebreaker });
});


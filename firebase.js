const admin = require('firebase-admin');

// Load your Firebase service account key
const serviceAccount = require('./groopv0-efec2-firebase-adminsdk-eggmr-b0af3c0a01.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://groopv0-efec2-default-rtdb.firebaseio.com/"
});

// Get a reference to the database
const db = admin.database();

// Function to save weights to Firebase
function saveWeightsToFirebase(weights) {
    return db.ref('MBTI_weights/').set(weights);
}

// Function to load weights from Firebase
function loadWeightsFromFirebase() {
    return db.ref('MBTI_weights/').once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
                return null;
            }
        })
        .catch(error => {
            console.error("Error reading from Firebase:", error);
            throw error;
        });
}

module.exports = { saveWeightsToFirebase, loadWeightsFromFirebase };
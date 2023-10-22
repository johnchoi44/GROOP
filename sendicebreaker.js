const admin = require('firebase-admin');
const { exec } = require('child_process');

const serviceAccount = require("./groopv0-efec2-firebase-adminsdk-eggmr-b0af3c0a01.json");
const { stdout } = require('process');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://groopv0-efec2-default-rtdb.firebaseio.com/'
});

const db = admin.database();
const chatroomIDRef = db.ref(`/chatrooms`)

// ... (your other code, Firebase initialization, etc.)

// This function will watch for new messages in every chatroom
// function watchForIcebergTrigger() {
//     const chatroomsRef = db.ref('/chatrooms');

//     chatroomsRef.on('child_added', (chatroomSnapshot) => {
//         const chatroomID = chatroomSnapshot.key;

//         // Watch for new messages in this chatroom
//         db.ref(`/chatrooms/${chatroomID}/messages`).on('child_added', (messageSnapshot) => {
//             const message = messageSnapshot.val();

//             // Check if the message contains the string "iceberg"
//             if (message.message.includes('iceberg')) {
//                 sendIcebreakerToChatroom(chatroomID);
//             }
//         });
//     });
// }


function sendIcebreakerToChatroom(chatroomID) {
    exec('python3 icebreaker.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Exec error: ${error}`);
            return;
        }

        const icebreakerMessage = stdout.trim();  // Get the icebreaker from the script's output

        // Now, send this as a message to the chatroom
        const chatroomRef = db.ref(`/chatrooms/${chatroomID}/icebreaker`);
        // console.log(chatroomRef)
        // const chatroomRef = 1;
        chatroomRef.set({
            message: icebreakerMessage,
            sender: 'SYSTEM',  // Or however you want to denote that this isn't from a specific user
            timestamp: admin.database.ServerValue.TIMESTAMP
        });
    });
}

// You'd then call this function whenever the "Icebreaker" button is pressed in a chatroom:
// sendIcebreakerToChatroom(8);

// Call this function to start watching for the iceberg trigger every 1 second
// setInterval(watchForIcebergTrigger, 1000)

// Export the function for use in other files
module.exports.sendIcebreakerToChatroom = sendIcebreakerToChatroom;
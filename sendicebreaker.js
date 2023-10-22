const { exec } = require('child_process');
const admin = require('firebase-admin');

// ... (your other code, Firebase initialization, etc.)

function sendIcebreakerToChatroom(chatroomID) {
    exec('python3 icebreaker.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Exec error: ${error}`);
            return;
        }

        const icebreakerMessage = stdout.trim();  // Get the icebreaker from the script's output

        // Now, send this as a message to the chatroom
        const chatroomRef = db.ref(`/chatrooms/${chatroomID}/messages`).push();
        chatroomRef.set({
            message: icebreakerMessage,
            sender: 'SYSTEM',  // Or however you want to denote that this isn't from a specific user
            timestamp: admin.database.ServerValue.TIMESTAMP
        });
    });
}

// You'd then call this function whenever the "Icebreaker" button is pressed in a chatroom:
// sendIcebreakerToChatroom(chatroomID);
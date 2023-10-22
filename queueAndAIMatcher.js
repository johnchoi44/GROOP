const admin = require('firebase-admin');
const { exec } = require('child_process');

// Initialize Firebase
const serviceAccount = require("./groopv0-efec2-firebase-adminsdk-eggmr-b0af3c0a01.json");
const { stdout } = require('process');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://groopv0-efec2-default-rtdb.firebaseio.com/'
});

const db = admin.database();
const queueRef = db.ref('/queue/users');
const chatroomIDRef = db.ref(`/chatrooms`)

// Function to check the queue size and invoke the Python script if necessary
// Periodically check the queue

// function createChatroom(usernames) {
//     // Here, you'll implement the logic to create a chatroom in your database using the provided usernames.
//     // Depending on how your database is set up, this could involve creating a new document with these usernames, 
//     // adding metadata like chatroom creation time, etc.

//     // Sample code (you'll need to adapt this to your actual database structure and needs):
//     const chatroomRef = db.ref('/chatrooms').push();  // Create a new chatroom entry
//     console.log(usernames)
//     chatroomRef.set({
//         users: usernames,
//         created: admin.database.ServerValue.TIMESTAMP  // Set the creation time to the current server time
//     });
// }

// function createChatroomAndAssignID(fullUserData) {
//     chatroomIDRef.transaction(currentID => {
//         return parseFloat((currentID || 0)) + 1; // Increment the ID
//     }, (error, committed, snapshot) => {
//         if (error) {
//             console.error("Chatroom ID increment failed:", error);
//         } else if (committed) {
//             const newChatroomID = snapshot.val();
//             console.log(`${newChatroomID}`)
//             const chatroomRef = db.ref(`/chatrooms/${newChatroomID}`);
//             chatroomRef.set({
//                 users: fullUserData,
//                 created: admin.database.ServerValue.TIMESTAMP
//             });
//             // Assign the chatroom ID to all users
//             fullUserData.forEach(userData => {
//                 db.ref(`/users/${userData.username}`).update({ chatroom: newChatroomID });
//             });
//         }
//     });
// }

// function createChatroomAndAssignID(fullUserData) {
//     const chatroomIDRef = db.ref('/chatroomIDCounter');
//     chatroomIDRef.transaction(currentID => {
//         return parseFloat((currentID || 0)) + 1; // Increment the ID
//     }, (error, committed, snapshot) => {
//         if (error) {
//             console.error("Chatroom ID increment failed:", error);
//         } else if (committed) {
//             const newChatroomID = snapshot.val();
//             const chatroomRef = db.ref(`/chatrooms/${newChatroomID}`);

//             // Create a chatroom with a unique ID and add the user data to it
//             chatroomRef.set({
//                 users: fullUserData,
//                 created: admin.database.ServerValue.TIMESTAMP
//             });

//             // Update each user's data with the chatroom ID they belong to
//             fullUserData.forEach(userData => {
//                 // Note: Make sure 'userData.username' is the correct way to get the username. If not, adjust as needed.
//                 const userRef = db.ref(`/users/`);
//                 console.log(userRef)
//                 userRef.update({ chatroom: newChatroomID });
//             });
//         }
//     });
// }

function createChatroomAndAssignID(fullUserData) {
    const chatroomIDRef = db.ref('/chatroomsIDCounter');
    chatroomIDRef.transaction(currentID => {
        return (currentID || 0) + 1; // Increment the ID
    }, (error, committed, snapshot) => {
        if (error) {
            console.error("Chatroom ID increment failed:", error);
        } else if (committed) {
            const newChatroomID = snapshot.val();
            const chatroomRef = db.ref(`/chatrooms/${newChatroomID}`);
            chatroomRef.set({
                users: fullUserData,
                created: admin.database.ServerValue.TIMESTAMP
            });
            // Assign the chatroom ID to all users
            fullUserData.forEach(userData => {
                const userRef = db.ref(`/users/${userData.uid}`);
                userRef.update({ chatroom: newChatroomID });
            });
        }
    });
}

// function fetchUserDataAndCreateChatroom(usernames) {
//     const fullUserData = [];
//     usernames.forEach(username => {
//         db.ref(`/users/${username}`).once('value', snapshot => {
//             fullUserData.push(snapshot.val());
//             if (fullUserData.length === usernames.length) {
//                 console.log(fullUserData)
//                 createChatroomAndAssignID(fullUserData);
//             }
//         });
//     });
// }

function fetchUserDataAndCreateChatroom(usernames) {
    const fullUserData = [];
    usernames.forEach(username => {
        const userRef = db.ref(`/users`).orderByChild('username').equalTo(username);
        userRef.once('value', snapshot => {
            const uid = Object.keys(snapshot.val())[0];  // Get the UID (key)
            const userData = snapshot.val()[uid];  // Get the user's data
            userData.uid = uid;  // Append the UID to the user's data
            fullUserData.push(userData);
            if (fullUserData.length === usernames.length) {
                createChatroomAndAssignID(fullUserData);
            }
        });
    });
}

function createChatroomsFromOutput(output) {
    console.log(output)
    // Split the output by newlines to get individual groups
    const groups = output.trim().split("\n");
    console.log(groups)

    groups.forEach(group => {
        // Split each group by commas to get individual usernames
        const usernames = group.split(",").map(username => username.replace(/"/g, '').trim());  // Remove quotes and trim spaces
        console.log(usernames)
        // Now, you can use these usernames to create a chatroom
        fetchUserDataAndCreateChatroom(usernames);
    });
}

function checkQueueAndProcess() {
    queueRef.once('value', (snapshot) => {
        const users = snapshot.val();

        if (users) {
            const totalUsers = Object.keys(users).length;
            const completeGroups = Math.floor(totalUsers / 4) * 4; // This will give you a number that's a multiple of 4.

            if (completeGroups > 0) {
                const selectedUsersKeys = Object.keys(users).slice(0, completeGroups);
                const selectedUsers = selectedUsersKeys.map(key => users[key]);

                // Convert to a string format for the Python script
                const usersString = JSON.stringify(selectedUsers);

                exec(`python3 vertexAIGroupGenerator.py '${usersString}'`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Exec error: ${error}`);
                        return;
                    }

                    console.log(`Output from Python script:\n ${stdout}`);
                    createChatroomsFromOutput(stdout)
                    // Once done, remove only the processed users from the queue
                    selectedUsersKeys.forEach(key => {
                        // queueRef.child(key).remove();
                        const a = 0
                    });
                });
            }
        }
    }); 
    // process.exit()
}

checkQueueAndProcess()

// setInterval(checkQueueAndProcess, 5000);  // Check every 1 seconds
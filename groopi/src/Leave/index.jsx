import { useState } from 'react';
import './leave.css';
import { useNavigate } from 'react-router-dom';
import { database } from '../../firebase-config';
import {ref, set, child, get} from "firebase/database";

function Leave(props) {
    
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();
    
    const writeFeedbackData = (userId, chatId, feedback) => {
        const dbRef = ref(database);
        const mbtiref = ref(database, 'users/' + userId + '/mbti');
        get(child(dbRef, `users/${userId}/mbti`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              set(ref(database, 'feedbacks/' + chatId), {
                userId: userId,
                feedback: feedback,
                mbti: snapshot.val()
              })
             
            }
            else {
              console.log("No data available");
            }}).catch((error) => {
            console.error(error);
          });
          
          
          navigate('/home')
        
    }
    return (
        <div className="Container">
            <div className="Sub">
            <div className='title'>Leave a feedback!</div>
            <input className= "feedback" value = {feedback} onChange = {(e) => {setFeedback(e.target.value)}} ></input>
            <div className='buttons'>
                <button className='submit' onClick={() => writeFeedbackData(props.uid, props.chatroomId, feedback)}>Submit</button>
                <button  className = 'back' onClick = {props.onClose}> Back</button>
            </div>
            </div>
        </div>
    )
}

export default Leave;
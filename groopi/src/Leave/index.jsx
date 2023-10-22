import { useState } from 'react';
import './leave.css';
import { useNavigate } from 'react-router-dom';
import { database } from '../../firebase-config';
import {ref, set } from "firebase/database";

function Leave({onClose}) {
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();
    
    function writeFeedbackData(userId, chatId, feedback) {
    
        set(ref(database, 'feedbacks/' + chatId), {
            userId: userId,
            feedback: feedback
        })
        .then(() => {
            navigate('/home')
        })
    }
    return (
        <div className="Container">
            <div className="Sub">
            <div className='title'>Leave a feedback!</div>
            <input className= "feedback" value = {feedback} onChange = {(e) => {setFeedback(e.target.value)}} ></input>
            <div className='buttons'>
                <button className='submit' onClick={writeFeedbackData}>Submit</button>
                <button  className = 'back' onClick = {onClose}> Back</button>
            </div>
            </div>
        </div>
    )
}

export default Leave;
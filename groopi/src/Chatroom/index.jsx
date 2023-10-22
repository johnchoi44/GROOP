import React, {useRef, useEffect, useState} from "react"
import logo2 from "../images/logo2.png"
import birdman from '../images/birdman.png'
import settings from "../images/Vector.png"
import fourusers from "./temp_data.jsx"
import Background from '../images/background.png'
import chad from '../images/chad.png'
import sharknado from '../images/sharknado.png'
import you from '../images/you.png'
import './chat.css';
import Leave from '../Leave/index'
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../../firebase-config";
import { child, get, onValue, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";


function Chatroom() {
    const [isLeaveVisible, setIsLeaveVisible] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isQuestionHovered, setIsQuestionHovered] = useState(false);
    const [username,setUsername] = useState('john');
    // const database = [{userId: 'john', photoId: 'chad', message: 'SUP'},{userId: 'mom', photoId: 'mom', message: 'hello mother'},{userId: 'dad', photoId: 'dad', message: 'hello father'},]
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [chatroomId, setChatroomId] = useState(null);
    const [uid, setUid] = useState("");
    const navigate = useNavigate();
    const dummy = useRef();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user){
                const uid = user.uid;
                setUid(uid);
                console.log(uid);
                const usernameRef = ref(database, `users/${uid}/`);
                get(usernameRef, "/").then(snapshot => {
                    if (snapshot.exists()){
                        const data = snapshot.val();
                        console.log(data);
                        setUsername(data.username);
                        setChatroomId(data.chatroom);
                    } else {
                        console.log("no data available");
                    }
                }).catch(err => {
                    console.log(err);
                });    

            }
        });
    }, []);

    useEffect(() => {
        if (chatroomId){

            const messagesRef = ref(database, `chatrooms/${chatroomId}/messages`);
            onValue(messagesRef, snapshot => {
                const data = snapshot.val();
                console.log(data);
                setMessages(data);
            });

            // get(messagesRef, "/").then(snapshot => {
            //     if (snapshot.exists()){
            //         const data = snapshot.val();
            //         setMessages(data);
            //         console.log(data);
            //     } else {
            //         console.log("no data available");
            //     }
            // }).catch(err => {
            //     alert(err);
            // });
        };
        
    }, [chatroomId])

    const isClicked = () => {
        setIsLeaveVisible(true)
    }

    const closeLeave = () => {
        setIsLeaveVisible(false)
    }
    

    const handleSendMessage = (message) => {
        // Create a new message object with the current user's ID and the input message
        var highestMsgId = messages.length + 1;
        
        set(ref(database, `chatrooms/${chatroomId}/messages/${messages.length + 1}`), {
            uid: uid,
            message: message
        }).catch(err => {alert(err)});

        setCurrentMessage("");
        dummy.current.scrollIntoView({behavior: 'smooth'});
    };
    
    return (
        <>  
        <div style = {{  fontFamily: 'Lexend',display: 'flex',alignItems:'center',justifyContent:'center',backgroundImage: `url(${Background})`, backgroundSize: 'cover',backgroundRepeat: 'no-repeat', height: '100vh',padding: '0',margin: '0'}}>
            {/* <button className="sidebar-toggle"
                onClick = {() => {setIsNavOpen(!isNavOpen)} }>
                <span className="material-symbols-outlined"> {
                isNavOpen ? "toggle_on": "toggle_off"}
                </span>
            </button> 
            
            <nav className= {`nav  ${isNavOpen ? "nav-open": "nav-closed"}`}>
                <img src = {settings} style = {{margin: 10, alignItems: 'left', display: "flex", flexDirection: "row", height: '20px',width: '20px',cursor: 'pointer'}}/>
                <img src = {logo2} style = {{alignSelf: 'center', display: "flex", flexDirection: "row",height: '80px',width: '240px',backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>

                
                {
                    fourusers.map((item) => (
                        <div className = "user_list">
                            <div className="user" style = {{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                                <div className="profile">
                                    {item.profile}
                                </div>
                                <div className= "namenbio" style={{display: "flex", flexDirection: "column", alignContent: "space-around"}}>
                                    <div className='username'>
                                        {item.username}
                                    </div>
                                    
                                    <div className="bio">
                                        {item.bio}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    ))
                }
                <div className="generate">Generate Ice Breaker!</div>
            </nav>
            <div className="Main">

            </div> */}

            <div className="mainCon">
                <div className="navBar">
                
                    
                    <img src= {settings} style = {{position: 'absolute', left: '240px',top: '97px',cursor: 'pointer' }}onMouseEnter={() => setIsQuestionHovered(true)}
                            onMouseLeave={() => setIsQuestionHovered(false)} />

                {isQuestionHovered && (
                        <div onMouseEnter={() => setIsQuestionHovered(true)}
                        onMouseLeave={() => setIsQuestionHovered(false)}className="chatSettings">
                        <div className="leaveButton" onClick={() => isClicked()}>Leave</div>
                        
                        </div>
                    )}

                    <img src={logo2} alt="" style = {{height: '50px',width: '150px', marginTop: '50px'}}/>
                    <div className="generate" style = {{marginTop: '70px'}}>
                        <img style = {{height: '40px',width: '40px'}}src= {birdman} alt="" />
                        <div className="descrip">
                            <p className = 'descripp'>Birdman</p>
                            <p className = 'descripp' style = {{fontSize: '7px',fontWeight:'400'}}>What can I say? I love birds and I'm a man</p>
                        </div>
                    </div>
                    <div className="generate">
                        <img style = {{height: '40px',width: '40px'}}src= {sharknado} alt="" />
                        <div className="descrip">
                            <p className = 'descripp'>sharknado</p>
                            <p className = 'descripp' style = {{fontSize: '7px',fontWeight:'400'}}>tornados and sharks</p>
                        </div>
                    </div>
                    <div className="generate">
                        <img style = {{height: '40px',width: '40px'}}src= {chad} alt="" />
                        <div className="descrip">
                            <p className = 'descripp'>lyftking</p>
                            <p className = 'descripp' style = {{fontSize: '7px',fontWeight:'400'}}>biggest bro you’ll ever see</p>
                        </div>
                    </div>
                    <div className="generate">
                        <img style = {{height: '40px',width: '40px'}}src= {you} alt="" />
                        <div className="descrip">
                            <p className = 'descripp'>you</p>
                            <p className = 'descripp' style = {{fontSize: '7px',fontWeight:'400'}}>I need some friends</p>
                        </div>
                    </div>
                    <div className="generatebut">
                        Generate Prompt!
                    </div>
                </div>
                {isLeaveVisible && <Leave onClose={closeLeave} uid = {uid} chatroomId = {chatroomId}/>}
                <div className="chatCon">
                    {/* <div className="chatTotal">
                        <img src={chad} style = {{height: '35px',width: '35px'}}alt="" />
                        <div className="chatBubble">hello my name is johndddddddkj;alkdfj; dfasdfakdjsf;lkajd;flkjasd;lkfja;lkdfj;laksdjf;lkasdjf;lkajsfd;lkjalksdjf;alkj</div>
                    </div> */}
                    <div className="chatSubCon">
                    {messages.map((message, index) => (
                    <div className={` ${message.uid === uid ? 'chatTotal2' : 'chatTotal'}`} key={index}>
                        {message.uid != uid && <img src={chad} className="chad" alt="" />}
                        <div className="chatBubble">{message.message}</div>
                        
                    </div>
                    
                    ))}
               <div style = {{marginTop: '80px'}}ref = {dummy}></div>
                </div>
                
                    <div className="inputContainer">
                        <input onChange={(e) => setCurrentMessage(e.target.value)} value={currentMessage} style = {{backgroundColor: '#FFFAE9',padding: '5px',borderRadius: '20px',height: '30px',width: '500px'}}type="text" placeholder="Type your message..." />
                        <div className = 'sendButton' onClick={() => handleSendMessage(currentMessage)}>Send</div>
                    </div>
                </div>

            </div>
            </div>

        </>
    )
}

export default Chatroom


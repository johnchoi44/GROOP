import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './home.css';

import { motion } from "framer-motion";
import wordlogo from '../images/wordlogo.png';
import profilebutton from '../images/profilebutton.png';
import logo from '../images/logo.png';
import logout from '../images/logout.png';
import gear from '../images/gear.png';
import tinyprofile from '../images/tinyprofile.png'
import Modal from '../Components/modal/Modal';
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth, database } from "../../firebase-config";
import { child, get, ref, onValue, set } from "firebase/database";

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [hover, setHover] = useState(true);
    const [select, setSelect] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [mbti, setMbti] = useState("");
    const [age, setAge] = useState("");
    const [uid, setUid] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [isQueue, setQueue] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
      onAuthStateChanged(auth, user => {
        if (user){
          const uid = user.uid;
          setUid(uid);
          const userRef = ref(database, `/users/${uid}`)
          get(userRef, "/").then(snapshot => {
            if (snapshot.exists()){
              const data = snapshot.val();
              setMbti(data.mbti);

              if (data.age == "under21"){
                setAge("Under 21");
              } else {
                setAge("Over 21");
              }
              setHobbies(data.hobbies);

              setUsername(data.username);
            } else {
              console.log("data not available");
            }
          }).catch(err => {
            alert(err);
          });

        }
      })
    }, []);

    useEffect(() => {
      if (isQueue){
        const chatroomRef = ref(database, `users/${uid}/chatroom/`);
        onValue(chatroomRef, snapshot => {
          const data = snapshot.val();
          console.log("chatroom listener");
          console.log(data);
          if (data !== null){
            if (data > 0){
              navigate("/chatroom");
            }
            
          }
        });
      }
    }, [isQueue]);

    const addToQ = () => {
      setQueue(!isQueue);
      const dbRef = ref(database, `queue/users/${uid}`);
      const updates = {};
      
      const data = {
        username: username,
        mbti: mbti
      }

      set(dbRef, data).then(() => {
        console.log("added to queue");
      }).catch(err => {alert(err)});
    }
    
    const openModal = () => {
    setModalOpen(true);
    };

    const closeModal = () => {
    setModalOpen(false);
    };
      
    const toggleMenu = () => {
          setMenuOpen(!isMenuOpen);
        
    };
    
      const navigate = useNavigate();
    const signout = () => signOut(auth).then(() => {
        // Sign-out successful.
        console.log("success")
        navigate("/")
          
      }).catch((error) => {
        // An error happened.
        console.log(error)
      });
      

    return (
        
        <div className = "BG">
            <div className="topBar">
                <img src = {wordlogo} style = {{marginLeft: '10px',marginTop: '10px',height: '60px',width: '185px'}}/>
                <img onClick={toggleMenu} src = {profilebutton} style = {{cursor: 'pointer',marginRight: '30px',height: '40px',width: '40px',backgroundSize: 'cover'}}/>
            

            </div>
                {isMenuOpen && (
            <div className="sub-menu-wrap">
            <div className="menu-item">
              <div className="menu-item-content">
                <img src={tinyprofile} onClick={openModal} alt="Profile" />
                <span onClick={openModal}>Profile</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-item-content">
                <img src={gear} alt="Settings" />
                <span onClick={openModal} >Settings</span>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-item-content">
                <img src={logout} alt="Log Out" />
                <span onClick={signout}>
                  Log Out 
                  
                </span>
              </div>
            </div>
          </div>
          
                )}
            <div className="midCon">
                <div className="Desc">
                    <motion.div initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1.5 }}
                                className = "Title">Introducing Groop: Instant Connections, Lasting Friendships!</motion.div>
                    <div className="subTitle">
                        <motion.p 
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}>GROOP is not just another chat platform; it's your shortcut to authentic friendships! </motion.p>
                        <motion.p initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}>Our advanced algorithms, incorporating MBTI attributes and powered by generative AI, ensure you're matched instantly with 3 compatible individuals. </motion.p>
                        <motion.p initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1 }}>Click "Chat Now!" and experience conversations crafted for you. </motion.p>
                        <motion.p initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 2, duration: 1 }}>Safe, smart, and simple – start your journey to meaningful connections today!</motion.p>
                    </div>
                    {/* {isQueue === false ?  :  */}
                    {!isQueue && <motion.div onClick = {addToQ}
                    initial ={{scale: 0}}
                    animate = {{scale: 1}}
                    transition = {{delay:2.5, duration: 1.5,type: "spring", stiffness: 200, damping: 10}}
                    whileHover={{ scale: 1.1 }}
                    className="chatNow" >Chat now!</motion.div>}
                    {isQueue && <span class="loader"></span>}
                </div>
                <div className="image">
                <motion.img initial={{ opacity: 0 }}
      animate={{ opacity: 1 }} transition={{ duration: 2 }} src = {logo} style = {{marginBottom: '50px', backgroundSize: 'cover', height: '600px',width:'600px'}} />
                </div>
                
            </div>


            {isModalOpen && <Modal onClose={closeModal} />}
            
        </div>
    );
}
export default Home
import React, { useState } from 'react';
import './Modal.css'; // Create a separate CSS file for styling
import exit from '../../images/exit.png';
import { auth } from '../../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const Modal = ({ onClose, mbti, age, hobbies }) => {

  const navigate = useNavigate()
  const [selectedMenuItem, setSelectedMenuItem] = useState('profile');

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
  }

console.log(auth)
const logout = () => signOut(auth).then(() => {
  // Sign-out successful.
  console.log("success")
  navigate("/")
    
}).catch((error) => {
  // An error happened.
  console.log(error)
});
  
  return (
    <div className="modal">
      <img onClick={onClose} style = {{cursor: 'pointer',position: 'absolute',right:'463px',top: '235px'}}src={exit} alt="" />
      <div className="modal-content">
        <div className="modalvertical">
          <p className={selectedMenuItem === 'profile' ? 'highlighted' : ''} onClick={() => handleMenuItemClick('profile')}>Profile</p>
          <p className={selectedMenuItem === 'settings' ? 'highlighted' : ''} onClick={() => handleMenuItemClick('settings')}>Settings</p>
          <p className={selectedMenuItem === 'logout' ? 'highlighted' : ''} onClick={() => handleMenuItemClick('logout')}>Logout</p>
        </div>
        <div className="modalhori">{selectedMenuItem === 'profile' ? 
        
          <div style = {{textAlign: 'left'}}>
            <p style = {{marginRight: '220px'}}>MBTI</p>
            <div className="line"/>
            <div className="attributes">
              {mbti}
            </div>
            
            <p style = {{marginRight: '220px'}}>Age</p>
            <div className="line"/>
            <div className="attributes2">
              {age}
            </div>
            {/* Show Age */}
            <p style = {{marginRight: '220px'}}>Hobbies</p>
            <div className="line"/>
            <div className="attributes3">
              {hobbies}
            </div>

          </div>
        : 
        (selectedMenuItem === "logout" ?
        <div>
        <div> Are you sure you want to log out? </div>
        <button className="logoutbut" onClick={logout}> Log out</button>
        </div>
        :
        'Settings coming soon'
        
        
        )}</div>
      </div>
    </div>
  );
};

export default Modal;

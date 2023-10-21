import React, { useState } from 'react';
import './Modal.css'; // Create a separate CSS file for styling
import exit from '../../images/exit.png';
const Modal = ({ onClose }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
  };
  return (
    <div className="modal">
      <img onClick={onClose} style = {{cursor: 'pointer',position: 'absolute',right:'445px',top: '220px'}}src={exit} alt="" />
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
            <p style = {{marginRight: '220px'}}>Age</p>
            <div className="line"/>
            <p style = {{marginRight: '220px'}}>Major</p>
            <div className="line"/>
            <p style = {{marginRight: '220px'}}>Hobbies</p>
            <div className="line"/>

          </div>
        : 
        
        
        'Settings coming soon'
        
        
        }</div>
      </div>
    </div>
  );
};

export default Modal;

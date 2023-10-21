import {React, useState} from "react";
import backgroundphoto from "../images/background.png";
import logo from '../images/logo.png';
import './style.css';

function Signin() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        
        <div style = {{  fontFamily: 'Lexend',display: 'flex',alignItems:'center',justifyContent:'center',backgroundImage: `url(${backgroundphoto})`, backgroundSize: 'cover',backgroundRepeat: 'no-repeat', height: '100vh',padding: '0',margin: '0'}}>
            <div className="subCon">
                <img src = {logo }style = {{marginRight: '30px',alignSelf: 'center',border: 'red',height: '300px',width: '300px',backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>
                <div className="subsubCon">
                    <h1 style = {{fontSize: '50px',marginBlockStart: '0', marginBlockEnd: '0'}}>Welcome!</h1>
                    <h1 style = {{fontSize: '10px',color: '#959494',marginBlockStart: '0', marginBlockEnd: '0',marginBottom: '50px'}}>Sign in with your account</h1>
                    <div className="inputTitle">
                        username
                    </div>
                    <input style = {{alignSelf: 'flex-start',borderRadius:'5px', border: '1px solid'}}></input>
                    <div className="inputTitle">
                        password
                    </div>
                    <input style = {{alignSelf: 'flex-start',borderRadius:'5px', border: '1px solid'}}></input>
                    
                    <div className="next" onclick = "openPage('Home.html')">
                        Log in
                </div>
                </div>

                
            </div>


        </div>
        
    );
}

export default Signin
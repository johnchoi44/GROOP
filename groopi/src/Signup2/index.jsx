import {React, useState} from "react";
import backgroundphoto from "../images/background.png";
import logo from '../images/logo.png';
import './signup2.css';
import { useNavigate } from "react-router-dom";
import question from '../images/question.png';

function Signup2() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mbti, setMbti] = useState("");
    const [age, setAge] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [isQuestionHovered, setIsQuestionHovered] = useState(false);


    const navigate = useNavigate();

    const mbtiOptions = [
        "INFJ", "INTJ", "INFP", "INTP",
        "ENFJ", "ENTJ", "ENFP", "ENTP",
        "ISFJ", "ISTJ", "ISFP", "ISTP",
        "ESFJ", "ESTJ", "ESFP", "ESTP"
      ];

      const hobbiesOptions = [
        "Reading", "Writing", "Traveling", "Sports",
        "Music", "Gardening", "Cooking", "Drawing",
        "Painting", "Photography", "Gaming", "Hiking",
        "Yoga", "Dancing", "Volunteering", "Coding"
      ];
      
    return (
        
        <div style = {{  fontFamily: 'Lexend',display: 'flex',alignItems:'center',justifyContent:'center',backgroundImage: `url(${backgroundphoto})`, backgroundSize: 'cover',backgroundRepeat: 'no-repeat', height: '100vh',padding: '0',margin: '0'}}>
            <div className="subCon">
                <img src = {logo} style = {{marginRight: '30px', alignSelf: 'center',border: 'red',height: '300px',width: '300px',backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>
                <div className="subsubCon">
                    <h1 style = {{fontSize: '50px',marginBlockStart: '0', marginBlockEnd: '0'}}>Welcome!</h1>
                    <h1 style = {{fontSize: '10px',color: '#959494',marginBlockStart: '0', marginBlockEnd: '0',marginBottom: '50px'}}>Register your account</h1>
                    <div className="inputTitle">
                        MBTI
                    </div>
                    <div className="line"></div>
                    <div    className="question"
                            
                            >
                    <select  style={{ borderRadius: '5px', border: '1px solid' }} value={mbti} onChange={(e) => setMbti(e.target.value)}>
                    <option value="">Select MBTI</option> 
                    {mbtiOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <img onMouseEnter={() => setIsQuestionHovered(true)}
                            onMouseLeave={() => setIsQuestionHovered(false)}style = {{cursor: 'pointer',height: '15px',width: '15px'}} src={question} alt="" />
                {isQuestionHovered && (
    <div onMouseEnter={() => setIsQuestionHovered(true)}
    onMouseLeave={() => setIsQuestionHovered(false)}className="question-popup">
      MBTI (Myers-Briggs Type Indicator) is a personality assessment tool used for compatibility matching; find your type at <a href = 'https://www.16personalities.com/'>[16personalities.com]</a>
    </div>
  )}
                </div>
                <div className="inputTitle">
                    Age
                </div>
                <div className="line"></div>
                <div style={{ alignSelf: 'flex-start' }}>
                    
                    <div style = {{display: 'flex', flexDirection: 'row',}}><label style = {{width: '70px'}} htmlFor="under21">Under 21 </label><input type="radio" id="under21" name="age" value="under21" checked={age === "under21"} onChange={() => setAge("under21")} /></div>
                    
                    <div style = {{marginTop: '10px',display: 'flex', flexDirection: 'row',}}><label style = {{width: '70px'}} htmlFor="21plus">21+ </label><input type="radio" id="21plus" name="age" value="21plus" checked={age === "21plus"} onChange={() => setAge("21plus")} /></div>
                </div>

                <div className="inputTitle">
                    Hobbies
                </div>
                <div className="line"></div>
                <select style={{ alignSelf: 'flex-start', borderRadius: '5px', border: '1px solid' }} value={hobbies} onChange={(e) => setHobbies(e.target.value)}>
                    <option value="">Select Hobby</option>
                    {hobbiesOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                    <div className="next" onClick = {() => navigate("/")}>
                        Done
                    </div>
                </div>

                
            </div>


        </div>
        
    );
}

export default Signup2
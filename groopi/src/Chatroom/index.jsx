import React, {useState} from "react"
import logo2 from "../images/logo2.png"
import settings from "../images/vector.png"
import fourusers from "./temp_data.jsx"
import './style.css';

function Chatroom() {
    const [isNavOpen, setIsNavOpen] = useState(false)

    return (
        <>
            <button className="sidebar-toggle"
                onClick = {() => {setIsNavOpen(!isNavOpen)} }>
                <span class="material-symbols-outlined"> {
                isNavOpen ? "toggle_on": "toggle_off"}
                </span>
            </button> 
            
            <nav className= {`nav  ${isNavOpen ? "nav-open": "nav-closed"}`}>
                <img style = {{margin: 10, alignItems: 'left',backgroundImage: `url(${settings})`, display: "flex", flexDirection: "row", height: '25px',width: '24px',backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>
                <img style = {{alignSelf: 'center',backgroundImage: `url(${logo2})`, display: "flex", flexDirection: "row",height: '80px',width: '240px',backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>

                
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

            </div>
        </>
    )
}

export default Chatroom


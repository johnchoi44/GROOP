import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";


const LogOut = ({onClose}) => {
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
            <div>
              <div>Are you sure you want to log out?</div>
              <button onClick = {signout}>Logout</button>
              <button onClick = {onClose}>Cancel</button>
            </div>
    )
}

export default LogOut
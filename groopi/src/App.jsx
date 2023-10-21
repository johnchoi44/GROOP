import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from "./Home/index";
import Signin from "./Signin/index";
import Signup from "./Signup/index";
import Signup2 from "./Signup2/index";

function App() {
  const router = createBrowserRouter([
    {
    path: "/",
    element: <Signin/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/signup2",
    element: <Signup2/>
  },

])

  return(
    <RouterProvider router =  {router}/>
  )
      
  
}

export default App

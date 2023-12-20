//App.js

import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"
import Profile from "./pages/profile/Profile"
import Messenger from "./pages/messenger/Messenger"
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import {useContext} from "react";
import { AuthContext } from "./context/AuthContext"

//import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  
  const {user} = useContext(AuthContext)
  return (

    <Router>
    <Routes>

        <Route exact path="/" element={user? <Home/> :<Navigate to= "/register" />} />
        <Route path="/login" element={user? <Navigate to="/"/> : <Login/>  } />
        
        <Route path="/register" element={user ?  <Navigate to="/"/>:<Register />} />

        <Route path="/messenger" element={user ? <Messenger /> : <Messenger />} />
        
        <Route path="/profile/:username" element={<Profile />} />
    
    
    
    </Routes>



    </Router>


  );
    
  

}

library.add(fas);
export default App;

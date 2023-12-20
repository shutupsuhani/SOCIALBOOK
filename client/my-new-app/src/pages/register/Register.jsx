import { useRef, useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();
  const [error, setError] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password does not match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("/auth/register", user);
        history("/login");
      } catch (err) {
        console.error(err);

       if (err.response && err.response.status === 400 && err.response.data.error === 'Username already exists') {
          alert('Username already exists / Please choose a different username or/ Try to Log In');
        } else {
          alert('Successfully Registered');
        }
      }
    }
  };

  return (
    <div className="login">
    <div className="loginWrapper">
      <div className="loginLeft">
          <h3 className="loginLogo">Socialbook</h3>
          <span className="loginDesc">Connect with your Friends and the World around you on Socialbook.</span>
      </div>
      <div className="loginRight">
          <form className="loginBox"  onSubmit={handleClick}>
         <label>Username:</label>    
          <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
              
              <label>Email:</label> 
              <input placeholder="enter your email" required ref={email} type="email" className="loginInput" />
              
              <label>Password:</label> 
              <input placeholder="enter your Password" required ref={password} type="password" minLength="6" className="loginInput" />
              
              <label>Password Again:</label> 
              <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password" />

              <button className="loginButton" type="submit">Sign up</button>
            
            <span className="loginForgot">Already have a account?</span>
            <button className="loginRegisterButton" type="submit">Log in</button>
          </form>
      </div>
    </div>
  </div>
  );
}

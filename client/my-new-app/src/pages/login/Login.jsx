import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../components/context/AuthContext";
import { Link } from "react-router-dom";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching,  dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginContainer">
        <div className="loginLeft">
          
          <h1 className="loginLogo">SocialBook</h1>
          <img src="https://readme-typing-svg.herokuapp.com/?color=teal%&size=20&center=true&vCenter=true&width=500&height=50&pause=500&vCenter=true&background=white&lines=Connect!!!;Build Relationship❤️;Chat📱;Post📷;" alt="Headline" />
          <span className="loginDesc">
           <p>Connect with your Friends and the World around you on Socialbook.</p>
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <label>Email:</label>
            <input
              placeholder="enter your email"
              type="Email"
              required
              className="loginInput"
              ref={email}
            />
            <label>Password:</label>
            <input
              placeholder="enter your Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />

            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? "loading.." : "Log In"}
            </button>

            <span className="loginForgot">Forgot Password?</span>
            <div className="text">
             
              <span>Do not have an Account?</span>
              <Link to='/register'>
                <p>Register</p>
              </Link>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}

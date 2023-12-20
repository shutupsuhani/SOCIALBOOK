
import { useContext,useRef } from "react";
import "./login.css"
import {loginCall} from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";




export default function Login() {

  const email = useRef();
  const password = useRef();
  const {user, isFetching , error ,dispatch} = useContext(AuthContext)




 const handleClick = (e)=>{
    
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value}
    ,dispatch)
 };

 console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">Socialbook</h3>
            <span className="loginDesc">Connect with your Friends and the World around you on Socialbook.</span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <label>Email:</label>
                <input placeholder="enter your email"  type="Email" required className="loginInput" ref={email} />
                <label>Password:</label>
                <input placeholder="enter your Password" type="password" required minLength="6" className="loginInput" ref={password}/>
                
                <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? ("loading..") : ("Log In")}</button>
              
              <span className="loginForgot">Forgot Password?</span>
              <p className="orText">OR</p>
              
              <button className="googleButton">
                <img className="googleImg" src="data:image/png;base64,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 " alt=""/>
               <b className="googleButtonText">SIGN IN with GOOGLE</b>
                </button>
              
              <button className="loginRegisterButton">
              {isFetching ? ("loading..") :( "Sign Up")}
                
              </button>
            </form>
        </div>
      </div>
    </div>
  )
}




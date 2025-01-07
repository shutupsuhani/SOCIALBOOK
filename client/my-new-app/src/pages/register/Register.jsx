import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const [avatar, setAvatar] = useState(null); // State to hold the selected image file
  const history = useNavigate();
  const [error, setError] = useState({});

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]); // Store the selected image file in state
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password does not match");
    } else {
      const formData = new FormData();
      formData.append("username", username.current.value);
      formData.append("email", email.current.value);
      formData.append("password", password.current.value);
      formData.append("avatar", avatar); 

      try {
        await axios.post("/auth/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
          },
        });
        history("/login");
      } catch (err) {
        console.error(err);

        if (
          err.response &&
          err.response.status === 400 &&
          err.response.data.error === "Username already exists"
        ) {

          toast.error("Username already exists / Please choose a different username or/ Try to Log In")
          
        } else {
          toast.error("Registration failed. Please try again later.")
        }
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="registerContainer">
          <div className="loginLeft">
            <h3 className="loginLogo">Socialbook</h3>
            <img
              className="dyntext"
              src="https://readme-typing-svg.herokuapp.com/?color=teal%&size=25&center=true&vCenter=true&width=500&height=50&pause=500&vCenter=true&background=white&lines=Connect!!!;Build Relationship❤️;Chat📱;Post📷;"
              alt="Headline"
            />
            <span className="loginDesc">
              Connect with your Friends and the World around you on Socialbook.
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick} >
              <label>Username:</label>
              <input
                placeholder="Username"
                required
                ref={username}
                className="loginInput"
              />

              <label>Email:</label>
              <input
                placeholder="enter your email"
                required
                ref={email}
                type="email"
                className="loginInput"
              />

              <label>Password:</label>
              <input
                placeholder="enter your Password"
                required
                ref={password}
                type="password"
                minLength="6"
                className="loginInput"
              />

              <label>Confirm Password:</label>
              <input
                placeholder="Password Again"
                required
                ref={passwordAgain}
                className="loginInput"
                type="password"
              />

              <div className="Inputfile">
                <input
                  onChange={handleFileChange}
                  accept="image/*" 
                  style={{ display: "none" }}
                  className="infile"
                  id="file"
                  type="file"
                />
                <label className="filelabel" htmlFor="file">
                  <img className="profileCam" src="./cam1.png" />
                  <span
                    style={{ fontSize: "15px", fontFamily: "monospace", marginBottom: "10px" }}
                    className="inptxt"
                  >
                    Add an avatar
                  </span>
                </label>
              </div>

              <button className="loginButton" type="submit">
                Sign up
              </button>

              <span className="loginForgot">
                Already have an account?
                <Link to="/login">
                  Login<p></p>
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

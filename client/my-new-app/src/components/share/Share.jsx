//client ..Share.jsx
import React from "react"
import "./share.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Cancel} from "@material-ui/icons";
import {useContext,useRef,useState} from "react" 
import {AuthContext} from "../../context/AuthContext";
import axios from "axios" 

/*export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (err) {}


  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
            <img class="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF+"/person/noavataar.png"} alt=""/>
             <input placeholder={"What's in your mind" + " " + user.username + "?"} ref={desc} className="shareInput"  />
             
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}


        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">

            <label htlFor="file" className="shareOption">
            <i><FontAwesomeIcon icon="fa-solid fa-film" htmlColor="red" className="shareIcon" /></i>
            <span className="shareOptionText">Photo or Video</span>
            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e=>setFile(e.target.files[0]))}/>
            </label>
    
            <div className="shareOption">
            <i><FontAwesomeIcon icon="fa-solid fa-tag" className="shareIcon" /></i>
            <span className="shareOptionText">Tag</span>
            </div>

            
            <div className="shareOption">
            <i><FontAwesomeIcon icon="fa-solid fa-location-dot"  className="shareIcon" /></i>
            <span className="shareOptionText">Locations</span>
            </div>

            <div className="shareOption">
            <i><FontAwesomeIcon icon="fa-solid fa-face-smile-beam" className="shareIcon" /></i>
            <span className="shareOptionText">Feelings</span>
            </div>

          </div>
          <button className="shareButton" type="submit" >Share</button>
        </form>
      </div>
    </div>
  )
}   */


export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user?._id,  // Make sure user is not undefined
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.error(err);
      }
    }
    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user?.profilePicture ? PF + user.profilePicture : PF + "/person/noavataar.png"}
            alt=""
          />
          <input placeholder={"What's in your mind" + " " + user?.username + "?"} ref={desc} className="shareInput" />
        </div>
        <hr className="shareHr" />

        <form className="shareBottom" onSubmit={submitHandler}>
          
        <div className="shareOptions">

<label htlFor="file" className="shareOption">
<i><FontAwesomeIcon icon="fa-solid fa-film" htmlColor="red" className="shareIcon" /></i>
<span className="shareOptionText">Photo or Video</span>
<input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e=>setFile(e.target.files[0]))}/>
</label>

<div className="shareOption">
<i><FontAwesomeIcon icon="fa-solid fa-tag" className="shareIcon" /></i>
<span className="shareOptionText">Tag</span>
</div>


<div className="shareOption">
<i><FontAwesomeIcon icon="fa-solid fa-location-dot"  className="shareIcon" /></i>
<span className="shareOptionText">Locations</span>
</div>

<div className="shareOption">
<i><FontAwesomeIcon icon="fa-solid fa-face-smile-beam" className="shareIcon" /></i>
<span className="shareOptionText">Feelings</span>
</div>

</div>
<button className="shareButton" type="submit" >Share</button>

        </form>
      </div>
    </div>
  );
}





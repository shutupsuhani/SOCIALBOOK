import "./profile.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {useState,useEffect,useContext} from "react";
import axios from "axios"
import {useParams} from "react-router"; 
import { AuthContext } from "../../components/context/AuthContext";
import {Link} from "react-router-dom"
export default function Profile() {

   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   
   const [users,setUser] = useState({});
   const username = useParams().username;
   const { user: currentUser,dispatch } = useContext(AuthContext);
   const [followed,setFollowed] =useState(currentUser.followings.includes(users?._id))
//
   useEffect(()=>{
    setFollowed(currentUser.followings.includes(users?._id))
  },[currentUser,users])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`);
        console.log("Response Data:", res.data); // Log the response data
        console.log("Full Response Object:", res); // Log the entire response object
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchUser();
  }, [username]);
  

  const handleClick = async () =>{
  
    try {
      if (followed) {
        await axios.put(`/users/${users._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: users._id });
      } else {
        await axios.put(`/users/${users._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: users._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }

  }
  
  

  return (
    <>
       <Topbar/>
        <div className="profile">
        <Sidebar/>
        <div className="profileRight">
         <div className="profileRightTop">
            <div className="profileCover">
            <img className="profileUserImg" src={users.profilePicture ? PF +users.profilePicture : PF+"/person/noavataar.png"} alt=""/>  
            <img className="profileCoverImg" src={users.coverPicture ? PF+users.coverPicture : PF+"/person/nocover.png"} alt=""/>
            
         </div>

         <div className="profileInfo">
            <h4 className="profileInfoName">{users.username}</h4>
            <h4 className="profileInfoDesc">{users.desc}</h4>
            {users.username !== currentUser.username && (
              <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
           
          </button>
           )}
         </div>
           
        

         </div>
         <div className="profileRightBottom">

         <Feed username={username}/>
        <Rightbar users={users}/>

         </div>
        
        </div>
        
        </div>

       
       </> 
  );
}
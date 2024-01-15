//client ..Rightbar.jsx

import "./right.css"
import Online from "../../components/online/Online"; 
import {Users} from "../../dummyData"
import {useEffect,useState,useContext} from "react"
import axios from "axios"
import {AuthContext} from "../../context/AuthContext"
import {Link} from "react-router-dom"
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export default function Rightbar({users}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
  const [friends, setFriends] = useState([]);
  const { user: currentUser,dispatch } = useContext(AuthContext);
  const [followed,setFollowed] =useState(currentUser.followings.includes(users?._id))
  

  useEffect(()=>{
    setFollowed(currentUser.followings.includes(users?._id))
  },[currentUser,users])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + users._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [users]);
  

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
  
  
  
  const HomeRightbar = () =>{
    return(
      <>
      <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
          <b>Priya</b> and <b>other friends</b> have a birthday today   
         </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">

           {Users.map(u => (
            <Online key={u.id} user={u} />
           ))}
           </ul>


      </>
    );
  }  

  const ProfileRightbar = () => {
    return (
      <>
        {users.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "unfollow" : "follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <div className="rightbarDiv">
          <h4 className="rightbarTitle">User information</h4>
          <div className="rightbarInfo">
          <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{users.city}</span>
        </div>

        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{users.from}</span>
        </div>

        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">{users.relationship ===1 ? "Single" : users.relationship ===1 ? "Married " :"-" }</span>
        </div>
      </div>
          </div>
          <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
            {friends.map((friend) => (
              <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                <div className="rightbarFollowing">
                  <div className="friends">
                  <img className="rightbarFollowingImg" src={friend.profilePicture ? PF + friend.profilePicture : PF + "/person/noavataar.png"} alt="" />
                  <span className="rightbarFollowingName">{friend.username}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        
      </>
    );
  }
 

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {users ? <ProfileRightbar/> :<HomeRightbar/>}
      </div>
    </div>
  )
}
import "./chatOnline.css"
import axios from "axios";
import { useEffect, useState } from "react";

export default function ChatOnline({onlineUsers,currentId,setCurrentChat}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);
 
  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  console.log(onlineUsers)
 
  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
   /* <div className="chatOnline">
             <div className="chatOnlineFriend">
                 <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src="data:image/jpeg;base64,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" alt="" />
                    <div className="chatOnlineBadge"></div>
                 </div>
                 <span className="chatOnlineName">
                   Priya Prasad
                 </span>
             </div> 




             


            


            
             
    </div>*/

    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o?.profilePicture? PF + o.profilePicture: PF + "person/noavataar.png"} alt=""/>
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  )
}

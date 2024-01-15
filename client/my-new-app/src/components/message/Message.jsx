import "./message.css"
import {format} from "timeago.js"
import {useState ,useEffect} from "react"
import axios from "axios";

export default function Message({message,own}) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${message.sender}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [message.sender]);
  
  return (
    <div className={own ? "message own ":"message"}>
      <div className="messageTop">
        <img src={user?.profilePicture? PF + user.profilePicture : PF + "person/noavataar.png" } alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

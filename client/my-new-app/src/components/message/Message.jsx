import "./message.css"
import {format} from "timeago.js"
import {useState} from "react"

export default function Message({message,own}) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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

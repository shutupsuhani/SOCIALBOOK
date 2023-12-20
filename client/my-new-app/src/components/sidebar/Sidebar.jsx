import "./sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Sidebar() {
  return (
    <div className="sidebar">
     <div className="sidebarWrapper">
      <ul className="sidebarList">
        <li className="sidebarListItem">
        <i><FontAwesomeIcon icon="fa-solid fa-house"  className="sidebarIcon" /></i>
        <span className="sidebarListItemText">Home</span>
        </li>

        <li className="sidebarListItem">
        <i><FontAwesomeIcon icon="fa-solid fa-compass"  className="sidebarIcon" /></i>
        <span className="sidebarListItemText">Explore</span>
        </li>

        <li className="sidebarListItem">
        <i><FontAwesomeIcon icon="fa-solid fa-plus"  className="sidebarIcon" /></i>
        <span className="sidebarListItemText">Create</span>
        </li>
        
        <li className="sidebarListItem">
        <i>< FontAwesomeIcon icon="fa-solid fa-circle-play" className="sidebarIcon" /></i>
        <span className="sidebarListItemText">Videos</span>
        </li>


        <li className="sidebarListItem">
        <i><FontAwesomeIcon icon="fa-solid fa-rss" className="sidebarIcon" /></i>
        <span className="sidebarListItemText">Feed</span>
        </li>

        <li className="sidebarListItem">
        <i>< FontAwesomeIcon icon="fa-solid fa-users-rectangle" className="sidebarIcon" /></i>
        <span className="sidebarListItemText">Group</span>
        </li>

        <li className="sidebarListItem">
        <i>< FontAwesomeIcon icon="fa-solid fa-bookmark"className="sidebarIcon" /></i>
        <span className="sidebarListItemText">Saved</span>
        </li>
        
        

      </ul>

      <button className="sidebarButton">Show More</button>
      <hr className="sidebarHr"/>
      <ul className="sidebarFriendList">
        <li className="sidebarFriend">
          <img className="sidebarfriendImg" src="/assets/person/second.jpg" alt=""/>
          <span class="sidebarFriendName">Lisa</span>
        </li>

        <li className="sidebarFriend">
          <img className="sidebarfriendImg" src="/assets/person/first.jpg" alt=""/>
          <span class="sidebarFriendName">Sneha</span>
        </li>

        <li className="sidebarFriend">
          <img className="sidebarfriendImg" src="/assets/person/third.jpg" alt=""/>
          <span class="sidebarFriendName">Megha</span>
        </li>
        
        <li className="sidebarFriend">
          <img className="sidebarfriendImg" src="/assets/person/fifth.jpg" alt=""/>
          <span class="sidebarFriendName">Priya</span>
        </li>
      
      </ul>
     </div>
    </div>
  )
}






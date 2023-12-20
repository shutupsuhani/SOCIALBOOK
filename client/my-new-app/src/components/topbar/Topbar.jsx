//client ..Topbar.jsx
import "./top.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom"
import {useContext} from "react" 
import {AuthContext} from "../../context/AuthContext";

export default function Topbar() {
 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const {user} = useContext(AuthContext)

  if (!user) {
    // You can return some loading state or an empty div here, depending on your requirements
    return null
  }
  

  return (
    <div>
      <div className="topbarContainer">
        <div className="topbarLeft">

          <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">Socialbook</span>
          </Link>

        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <i><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="searchIcon"/></i>
            <input className="searchInput" placeholder="Search for friend,post or video"/>
            
            </div>
        </div>
        <div className="topbarRight"></div>
        <div className="topbarlinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
           <i><FontAwesomeIcon icon="fa-solid fa-user" className="user"/></i>
           
          </div>

          <div className="topbarIconItem">
           
           <Link to="/messenger" style={{textDecoration:"none",color:"white"}}>
           <i><FontAwesomeIcon icon="fa-solid fa-message" /></i>
           </Link>

          </div>

          <div className="topbarIconItem">
           <i><FontAwesomeIcon icon="fa-solid fa-bell" /></i>
           
          </div>
          
          <div>
            <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture ? PF+user.profilePicture : PF+"/person/noavataar.png"} alt="" className="topBarImg" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

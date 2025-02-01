import "./top.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        const response = await axios.get(`https://socialbook-server-xi.vercel.app/api/users/search?q=${query}`);
        setSuggestions(response.data);
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  const handleLogout = async () => {
    try {
      // Make a GET request to logout endpoint on the server
      await axios.get('/logout');
      
      // Clear the token from cookies or local storage
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Redirect to the login page or any other page after logout
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout error
    }
  };


  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Socialbook</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <i><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="searchIcon" /></i>
            <input
              className="searchInput"
              placeholder="Search for friend, post, or video"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className="suggestionsList">
                {suggestions.map(user => (
                  <li key={user._id} className="suggestionItem">
                    <Link to={`/profile/${user.username}`} className="suggestionLink">
                      <img
                        src={user.profilePicture ? PF + user.profilePicture : PF + "/person/noavataar.png"}
                        alt=""
                        className="suggestionImg"
                      />
                      <span className="suggestionUsername">{user.username}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <i><FontAwesomeIcon icon="fa-solid fa-user" className="user" /></i>
            </div>
            <div className="topbarIconItem">
              <Link to="/messenger" style={{ textDecoration: "none", color: "white" }}>
                <i><FontAwesomeIcon icon="fa-solid fa-message" /></i>
              </Link>
            </div>
            <div className="topbarIconItem">
              <i><FontAwesomeIcon icon="fa-solid fa-bell" /></i>
            </div>
            <div>
              <Link to={`/profile/${user.username}`}>
                <img
                  src={user.profilePicture ? PF + user.profilePicture : PF + "/person/noavataar.png"}
                  alt=""
                  className="topBarImg"
                />
              </Link>
              {showDropdown && (
              <div className="dropdownMenu">
                <p>{user.username}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

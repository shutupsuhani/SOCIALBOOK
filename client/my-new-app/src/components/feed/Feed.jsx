// feed.jsx
import { useState, useEffect,useContext } from "react";
import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post.jsx"
import axios from "axios" 
import {AuthContext} from "../../context/AuthContext"

export default function Feed({username}) {
  const [post,setPost] = useState([]);
  const {user} = useContext(AuthContext);
  
  useEffect(() => {
    const fetchPosts = async () => {

      try {
        const res = username
        ? await axios.get("/post/profile/"+username)
        : await axios.get("/post/timeline/"+user._id);
        console.log("Response Data:", res.data); // Log the response data
        console.log("Full Response Object:", res); // Log the entire response object
        setPost(res.data.sort((p1,p2)=>{
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, [username,user._id]);

  return (
    <div className="feed">
     
      <div className="feedWrapper">
       {(!username||(username===user.username)) && <Share/>}
       {post.map((p)=>(

        <Post key={p._id}  post={p}/>

        ))}    
        
        

      </div>
    </div>
  );
}
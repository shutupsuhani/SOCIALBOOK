import "./post.css";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setisLiked] = useState(false);
  const [users, setUser] = useState({});

  useEffect(() => {
    // Check if the current user's ID is in the post.likes array
    const likedByCurrentUser = post.likes.includes(currentUser._id);
    setisLiked(likedByCurrentUser);
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://socialbook-server-xi.vercel.app/api/users?userId=${post.userId}`);
        console.log("Response Data:", res.data); // Log the response data
        console.log("Full Response Object:", res); // Log the entire response object
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/post/" + post._id + "/like", { userId: currentUser._id });
    } catch {}
    setLike(isLiked ? like - 1 : like + 1);
    setisLiked(!isLiked);
  };


  return (
    <div className="post">
      <div className="postWrapping">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${users.username}`}>
              <img
                src={
                  users.profilePicture
                    ? PF + users.profilePicture
                    : PF + "/person/noavataar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>

            <span className="postUsername">{users.username}</span>

            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <i>
              <FontAwesomeIcon
                icon="fa-solid fa-ellipsis-vertical"
                className="threeDots"
              />
            </i>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            src={PF + post.img}
            alt=""
            className="postImg"
            height={700}
            width={700}
          />
          <br />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">liked by {like} people</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

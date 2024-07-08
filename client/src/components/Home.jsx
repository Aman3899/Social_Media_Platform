import { useEffect, useState } from "react";
import MainNavbar from './MainNavbar';
import Footer from './Footer';
import "../styles/Home.css";

const Home = () => {
  const [usersPost, setUsersPost] = useState([]);

  const handlePosts = async () => {
    try {
      const response = await fetch("https://social-media-platform-api-beta.vercel.app/getPosts", { method: "GET" });
      if (response.ok) {
        const resJSON = await response.json();
        setUsersPost(resJSON);
      } else {
        console.error("Failed to fetch posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    handlePosts();
  }, []);

  const handleLike = async (username) => {
    try {
      const response = await fetch("https://social-media-platform-api-beta.vercel.app/updateLikes", {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
      });
      if (response.ok) {
        handlePosts(); // Refresh the posts to reflect the updated likes
      } else {
        console.error("Failed to update like:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const renderUsers = () => {
    return usersPost.map((user) => {
      const base64String = (user.image).toString('base64');
      const imgSrc = `data:image/jpeg;base64,${base64String}`;

      return (
        <li key={user.email} style={{
          fontSize: "large",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px",
          width: "60%",
          marginLeft: "19%"
        }}>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>Post Shared by: {user.username}</div>
          <img src={imgSrc} alt="Avatar" className="avatar" style={{ width: "30%", borderRadius: "20px" }} />
          <div style={{ fontSize: "16px", color: "#666" }}>{user.postText}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <div style={{ cursor: "pointer" }} onClick={() => handleLike(user.username)}>
              <i className="fa fa-thumbs-up" aria-hidden="true"></i> {user.likes} Likes
            </div>
            <div style={{ cursor: "pointer", marginLeft: "40px" }}>
              <i className="fa fa-comments" aria-hidden="true"></i> {user.comments.length} Comments
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <div>
      <MainNavbar />
      <div style={{ width: "100%" }}>
        <div className="homeFeed" style={{ margin: "20px" }}>
          <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
            {renderUsers()}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

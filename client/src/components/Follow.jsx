import React, { useState, useEffect } from "react";
import "../styles/Follow.css";

function Follow({ data }) {
  const [suggestions, setSuggestions] = useState([]);
  const [followStatus, setFollowStatus] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const username = data;

  const fetchFollowersCount = async () => {
    try {
      const response = await fetch("http://localhost:3001/getFollowersCount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const resJSON = await response.json();
      if (response.ok) {
        setFollowers(resJSON.followersCount);
      } else {
        console.error("Failed to fetch followers count:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching followers count:", error);
    }
  };

  const fetchFollowingCount = async () => {
    try {
      const response = await fetch("http://localhost:3001/getFollowingCount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const resJSON = await response.json();
      if (response.ok) {
        setFollowing(resJSON.followingCount);
      } else {
        console.error("Failed to fetch following count:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching following count:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/getAllUsers", {
        method: "GET",
      });
      if (response.ok) {
        const resJSON = await response.json();
        setSuggestions(resJSON);

        const userIds = resJSON.map((user) => user._id);
        const statusResponse = await fetch("http://localhost:3001/isFollower", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds, username }),
        });
        const statusJSON = await statusResponse.json();
        if (statusResponse.ok) {
          setFollowStatus(statusJSON.followStatus);
        } else {
          console.error("Failed to check follow status:", statusResponse.statusText);
        }
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const followUser = async (userId) => {
    try {
      const response = await fetch("http://localhost:3001/followUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, username }),
      });

      if (response.ok) {
        fetchData();
        fetchFollowersCount(); // Fetch the followers count again after following a user
        fetchFollowingCount(); // Fetch the following count again after following a user
      } else {
        console.error("Failed to follow user:", response.statusText);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFollowersCount();
    fetchFollowingCount();
  }, []);

  return (
    <div className="Follow">
      <div className="UserInfo">
        <div className="Followers">
          <p>{followers}</p>
          <p>Followers</p>
        </div>
        <div className="Following">
          <p>{following}</p>
          <p>Following</p>
        </div>
      </div>
      <div className="Suggestions">
        <h3>Suggestions</h3>
        <ul className="suggest">
          {suggestions.map((user, index) => (
            <li key={user._id}>
              <p>{user.username}</p>
              <button
                className="button"
                onClick={() => followUser(user._id)}
              >
                {followStatus[index] ? "Followed" : "Follow"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Follow;

import { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/Searching.css";


const Searching = () => {


    const { register, handleSubmit } = useForm();
    const [ usersAccount, setUsersAccount ] = useState([]);
    const [ userPosts, setUserPosts ] = useState([]);
    const [ usernameView, setUsernameView ] = useState("");
    
    const handleAccountSearching = async (data) => {

        const response = await fetch(`http://localhost:3000/searchAccounts?username=${data.search}`, { method: "GET" });
        const resJSON = await response.json();

        setUsersAccount(resJSON);
    };

    const handleAccountClick = async (username) => {

        setUsernameView(username);
        setUserPosts([]);

        const response = await fetch(`http://localhost:3000/getUserPosts?username=${username}`, { method: "GET" });
        const resJSON = await response.json();

        setUserPosts(resJSON);
    };


    const renderUserPosts = () => {

        return userPosts.map((user) => {

            const base64String = (user.image).toString('base64');
            const imgSrc = `data:image/jpeg;base64,${base64String}`;

            return (
                <>
                <li key={user.email} style={{ fontSize: "large", display: "flex", flexDirection: "column", alignItems: "center", 
                    border: "1px solid #ccc", width: "60%", marginLeft: "19%", borderRadius: "20px" }}>
    
                <img src={imgSrc} alt="Avatar" className="avatar" style={{ width: "30%", borderRadius: "20px" }} />
                <div style={{ fontSize: "16px", color: "#666" }}>{user.postText}</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "10px" }}>
    
                <div style={{ cursor: "pointer" }}>
                    <i className="fa fa-thumbs-up" aria-hidden="true"></i> {user.likes} Likes
                </div>
    
                <div style={{ cursor: "pointer", marginLeft: "40px" }}>
                    <i className="fa fa-comments" aria-hidden="true"></i> {user.comments.length} Comments
                </div>
                </div>
                </li><br />
                </>
                
            );
        });
    };




    const renderUsers = () => {

        return usersAccount.map((user) => (
            
            <li key={user.email} style={{ fontSize: "large", padding: "10px" }}>
                <a href="#" onClick={ () => handleAccountClick(user.username) } style={{ textDecoration: "none", color: "black" }}>
                    <img src={`https://www.w3schools.com/w3images/avatar${Math.floor(Math.random()*6 + 1)}.png`} alt="Avatar" className="avatar" style={{ width: "15%", borderRadius: "50%" }} />
                    &nbsp;&nbsp;{user.username}
                </a>
            </li>
        ));
    };


    return (
        <div className="searching">
            <div className="accountSearching">
                <h2 style={{ textDecoration: "underline" }}>Search</h2>

                <form action="" onSubmit={handleSubmit(handleAccountSearching)}>
                    <input type="text" { ...register("search") } placeholder="🔍 Search" />
                    <button>Search</button>
                </form>
                <hr />

                <div className="accountsData" style={{ margin: "20px" }}>
                    <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>{renderUsers()}</ul>
                </div>
            </div>

            <div className="postsSearching">
                <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
                    <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>Posts shared by: { usernameView } </h2>
                    {renderUserPosts()}
                </ul>
            </div>
        </div>
    );
};

export default Searching;
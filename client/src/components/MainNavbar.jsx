// import React from 'react';
import { Link } from "react-router-dom";

const MainNavbar = () => {
  return (
    <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
            <div className="navbar-header">
                <Link className="navbar-brand" to="#">Socialism</Link>
            </div>
            <ul className="nav navbar-nav">
                <li className="active"><Link to="/home">Home</Link></li>
                <li><Link to="/createPost">Create ➕</Link></li>
                <li><Link to="/search">Search 🔎</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/account"><span className="glyphicon glyphicon-user"></span>  Manage Account</Link></li>
                <li><Link to="/"><span className="glyphicon glyphicon-log-in"></span>  Sign Out</Link></li>
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default MainNavbar;
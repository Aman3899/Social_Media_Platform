// import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/home">Socialism</Link>
            </div>
            <ul className="nav navbar-nav">
                <li className="active"><Link to="/home">Home</Link></li>
                <li><Link to="https://aman-ullah.netlify.app/about" target="_blank">About Us</Link></li>
                <li><Link to="https://aman-ullah.netlify.app/" target="_blank">Portfolio</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/register"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                <li><Link to="/"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
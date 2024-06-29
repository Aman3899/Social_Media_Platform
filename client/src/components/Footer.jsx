// import React from 'react';
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <>
        <footer id="myFooter">
            <div><span>All Copyrights reserved - 2024 &copy;</span></div>

            <div>
                <Link to="https://www.facebook.com/profile.php?id=100037533051466/" target="_blank"><i className="fa fa-facebook-f"></i></Link>
                <Link to="https://www.instagram.com/aman_ullah057//" target="_blank"><i className="fa fa-instagram"></i></Link>
                <Link to="https://www.linkedin.com/in/aman-ullah-2a124824a/" target="_blank"><i className="fa fa-linkedin"></i></Link>
                <Link to="https://github.com/Aman3899" target="_blank"><i className="fa fa-github"></i></Link>
            </div>
        </footer>
    </>
  );
};

export default Footer;
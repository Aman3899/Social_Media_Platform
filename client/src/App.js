import React, {useState} from 'react';
import './App.css'
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
const LoginSignUp = () => {

    const[action, setAction] = useState('');

    const signupLink = () => {
        setAction('active');
    };

    const loginLink = () => {
        setAction('');
    };

  return (  
    <div className={`wrapper ${action}`}>
       <div className="form-box login">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forget password?</a>
          </div>

          <button type="submit">Login</button>

          <div className="signup-link">
            <p>
              Don't have an account? <a href="#" onClick={signupLink}>SignUp</a>
            </p>
          </div>
        </form>
      </div>

      <div className="form-box signUp">
        <form action="">
          <h1>SignUp</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <FaEnvelope className="icon" />
          </div>

          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              I agree to the terms & conditions
            </label>
          </div>

          <button type="submit">SignUp</button>

          <div className="signup-link">
            <p>
              Already have an account? <a href="#" onClick={loginLink}>Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignUp
// import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useForm } from "react-hook-form";

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [ isLogin, setIsLogin ] = useState(0);
  const navigate = useNavigate();


  const onSubm = async (data) => {

    let response = await fetch(`http://localhost:3000/login?email=${data.email}&password=${data.password}`, { method: "GET" });

    if ( response.ok ) {

      let resData = await response.json();

      if ( resData[0] == undefined ) {

        console.log("Login Failed");
        setIsLogin(-1);

      }
      else if ( data.email == resData[0].email || data.email == resData[0].username && data.password == resData[0].password ) {

        console.log("Login Successful");
        setIsLogin(1);

        navigate("/home");
      }
      else {
        console.log("Login Failed");
        setIsLogin(-1);
      }
    }
  }
  



  return (
    <>

      <h1 className="text-success text-center">Login Form</h1>
      
      <div className="container mt-5" id="loginForm">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <form id="registrationForm" action="/login" onSubmit={handleSubmit(onSubm)} method="GET">

                  <div className="form-group">
                    <label htmlFor="text">Enter your Email/Username:</label>
                    <input type="text" { ... register("email") } className="form-control" id="email" placeholder="m.amanullah0830@gmail.com OR amanullah" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Enter your Password:</label>
                    <input type="password" { ... register("password", { minLength: {value: 8, message: "Password must contains 8 Chars"}, 
                      maxLength: {value: 25, message: "Password cannot contains more than 25 Chars"} }) } className="form-control" id="password" placeholder="*********" required />
                      { errors.password && <div> {errors.password.message} </div> }
                  </div>

                  <button className="btn btn-danger">Log In</button><br />
                  { isLogin === 1 && <div> {"Login is Successfully Done!"} </div> }
                  { isLogin === -1 && <div> {"Login is Failed!"} </div> }

                </form>
                
                <br />
                <p className="mt-3">Not registered? <a href="/signup"> Create an account</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Login;
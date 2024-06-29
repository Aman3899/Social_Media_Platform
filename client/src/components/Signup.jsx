// import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useState } from "react";

const Signup = () => {

  const { register, handleSubmit, formState: {errors} } = useForm();

  const [ passwordStatus, setPasswordStatus ] = useState(0);
  const navigate = useNavigate();


  const onSubm = async (data) => {
    
    if ( data.password === data.confirmpassword ) {
      
      let response = await fetch("http://localhost:3000/signup", { method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
        let res = await response.text();
        console.log(data, res);
        setPasswordStatus(1);

        navigate("/home");
    }
    else {
        setPasswordStatus(-1);
    }
  }


  return (
    <div>
      <h1 className="text-success text-center" style={{ fontSize: "40px" }}>SignUp Form</h1>

      <div className="container mt-5" id="loginForm">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <form id="registrationForm" action="" onSubmit={handleSubmit(onSubm)}>

                  <div className="form-group">
                    <label htmlFor="email">Enter your Email:</label>
                    <input type="email" { ... register("email") } className="form-control" id="email" placeholder="m.amanullah0830@gmail.com" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="username">Enter your Username:</label>
                    <input type="text" { ... register("username") } className="form-control" id="username" placeholder="amanullah" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="DOB">Enter your Date of Birth:</label>
                    <input type="date" { ... register("DOB") } className="form-control" id="DOB" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Enter your Password:</label>
                    <input type="password" { ... register("password", { minLength: {value: 8, message: "Password must contains 8 Chars"}, 
                      maxLength: {value: 25, message: "Password cannot contains more than 25 Chars"} }) } className="form-control" id="password" placeholder="*********" required />
                      { errors.password && <div> {errors.password.message} </div> }
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm your Password:</label>
                    <input type="password" {...register("confirmpassword", 
                    { minLength: { value: 8, message: "Password must contains 8 Chars" },
                      maxLength: { value: 25, message: "Password cannot contains more than 25 Chars" },
                      equalTo: { value: 'password', message: "Confirm Password does not matched with actual one" }
                    })} className="form-control" id="confirmpassword" placeholder="*********" required />
                    {errors.confirmpassword && <div>{errors.confirmpassword.message} </div>}
                    { passwordStatus === -1 && <div> { "Confirmed password & password does not matched. Try Again! " } </div>  }
                  </div>


                  <button className="btn btn-danger">Sign Up</button>

                </form>
                
                <br />
                <p className="mt-3">Already have a account? <a href="/"> Login to your account</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Signup;
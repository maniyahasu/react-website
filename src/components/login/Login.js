import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = (props) => {
  const history = useNavigate();
  const [loginState, setloginState] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setisLoggedIn] = useState(false);

  // Method to handle all the input change event
  const inputChangeHandler = (event) => {
    const name = event.target.name;
    setloginState({
      ...loginState,
      [name]: event.target.value,
    });
  };
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setloginState({
        username: "",
        password: "",
    });
    setisLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    props.onUserLoggedIn(true);
    history("/");
  };
  return (
    <div id="login">
      <div className="container">
        <div
          id="login-row"
          className="row justify-content-center align-items-center"
        >
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form autoComplete="off" id="login-form" className="form">
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label htmlFor="username" className="text-info">
                    Username:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    value={loginState.username}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="text-info">
                    Password:
                  </label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    value={loginState.password}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="remember-me" className="text-info">
                    <span>Remember me</span> 
                    <span>
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                      />
                    </span>
                  </label>
                  <br />
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-info btn-md"
                    value="Login"
                    onClick={(e) => handleLoginSubmit(e)}
                  />
                </div>
                <div id="register-link" className="text-right">
                  <a href="#" className="text-info">
                    Register here
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

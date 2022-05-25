import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Login.scss";

const Login = (props) => {
  const history = useNavigate();
  const userEmail = useRef();
  const userPassword = useRef();

  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const loginFormSubmit = (event) => {
    event.preventDefault();
    const username = userEmail.current.value;
    const password = userPassword.current.value;

    if (username.trim().length === 0 || password.trim().length === 0) {
      toast.error('Username and password can not be blank', { autoClose: 2000});
      return;
    }
    const payload = {
      username: userEmail.current.value,
      password: userPassword.current.value
    };
    if (isRegister) {
      // Register user
      axios.post('http://localhost:8000/userLoginDetails', payload).then(resp => {
        if (resp.status === 201 && resp.data.id) {
          setIsRegister(false);
          toast.success('Register successfull !!', { autoClose: 2000, pauseOnHover: true });
          clearLoginForm();
        } else {
          toast.error('Error while registering the user !!', { autoClose: 2000, pauseOnHover: true });
          clearLoginForm();
        }
      });
    } else {
      // Login section
      axios.get(`http://localhost:8000/userLoginDetails?username=${username}&password=${password}`).then(resp => {
        if (resp.status === 200 && resp.data.length > 0) {
          setisLoggedIn(true);
          toast.success('Login successfull !!', { autoClose: 2000, pauseOnHover: true });
          localStorage.setItem('isLoggedIn', 'true');
          props.onUserLoggedIn(true);
          history("/");
        } else {
          toast.error('User does not exist, please register first', { autoClose: 2000, pauseOnHover: true });
          clearLoginForm();
        }
      });
    }


  };

  const clearLoginForm = () => {
    userEmail.current.value = '';
    userPassword.current.value = '';
  }
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
                <h3 className="text-center text-info">{isRegister ? 'Register' : 'Login'}</h3>
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
                    ref={userEmail}
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
                    ref={userPassword}
                  />
                </div>
                <div className="form-group">
                  <br />
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-info btn-md"
                    value={isRegister ? 'Register' : 'Login'}
                    onClick={(e) => loginFormSubmit(e)}
                  />
                  {isRegister && <input
                    type="button"
                    name="submit"
                    className="btn btn-info btn-md ml-2"
                    value='Cancel'
                    onClick={() => setIsRegister(false)}
                  />}
                </div>
                {!isRegister && <div id="register-link" className="text-right">
                  <a href="#" className="text-info" onClick={() => setIsRegister(true)}>
                    Register here
                  </a>
                </div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

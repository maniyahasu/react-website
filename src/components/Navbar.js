import React from "react";
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const loginFlag = props.isUserLoggedIn;
  const logOut = () => {
    props.onUserLoggedOut();
  }
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <NavLink className="nav-link text-white" to="/">
          React App
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse sidenav"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {loginFlag && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/product">
                    Product
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user">
                    User
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              { loginFlag && <>
                <NavLink className="nav-link" to='/' onClick={logOut}>
                 Logout
                </NavLink>
              </>}
              { !loginFlag && <>
                <NavLink className="nav-link" to="/login">
                 Login
                </NavLink>
              </>}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import React from "react";
import { NavLink } from "react-router-dom";
import Loader from "../shared/Loader";
import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../shared/UserCard";
import Container from '../shared/Container';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  // Getting user data from json server
  const fetchUserList = () => {
    setIsLoading(true);
    axios.get("http://localhost:8000/users").then((resp) => {
      setUserData(resp.data);
      setIsLoading(false);
    });
  };

  return (
    <>
      <Container>
        <div className="py-3 d-flex">
          <div className="row">
            <div className="col-md-12">
              <div className="pr-2">
                <NavLink to="/">
                  <i className="fas fa-arrow-left"></i>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div>Users</div>
            </div>
          </div>
        </div>
        <div className="body-content">
          {isLoading && <Loader height="80vh" />}
          <div className="user-card">
            <div className="row">
              {
                // eslint-disable-next-line array-callback-return
                userData.map(user => (
                  <div className="col-md-3 pb-3" key={user.id}>
                    <UserCard userDetails={user}/>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Users;

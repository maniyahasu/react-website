import React from "react";
import { Link } from "react-router-dom";

const UserCard = (props) => {
  const userData = props.userDetails;
  return (
    <>
      <div className="card">
        <img src={userData.avatar_url} alt={userData.login} />
        <div className="card-body">
          <h5 className="card-title">{userData.login}</h5>
          <div className="card-text pb-2">
            <div>
              Git URL:{" "}
              <a target="_blank" href={userData.html_url} rel="noreferrer">
                Visit
              </a>
            </div>
          </div>
          <Link to={`/user/${userData.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </>
  );
};
export default UserCard;

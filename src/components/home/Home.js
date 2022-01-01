import React from "react";
import Container from "../shared/Container";

const Home = () => {
  return (
    <>
      <Container>
        <div className="pt-3">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Welcome to React Website</h1>
              <p className="lead">
                Here, you will see the different kind of functions implemented using react.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;

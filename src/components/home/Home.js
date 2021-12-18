import React from "react";
import Container from "../shared/Container";

const Home = () => {
  return (
    <>
      <Container>
        <div className="pt-3">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Fluid jumbotron</h1>
              <p className="lead">
                This is a modified jumbotron that occupies the entire horizontal
                space of its parent.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;

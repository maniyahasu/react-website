import React from "react";
import { NavLink } from "react-router-dom";

const Product = (props) => {
  return (
    <>
      <div className="container">
        <div className="pt-3 d-flex">
          <div className="pr-2">
            <NavLink to="/"><i className="fas fa-arrow-left"></i></NavLink>
          </div>
          <div>Products</div>
        </div>
        <div className="body-content">
            
        </div>
      </div>
    </>
  );
};

export default Product;

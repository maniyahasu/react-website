import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { product } = props;
  return (
    <Link to={`/product/${product.id}`}>
      <div className="card">
        <div className="image">
          <img src={product.image} alt={product.image} />
        </div>
        <div className="card-body content">
          <h5 className="card-title header">{product.title}</h5>
          <div className="price">{product.price}</div>
          <div className="description pb-2">{product.category}</div>
        </div>
      </div>
    </Link>
  );
};
export default Product;

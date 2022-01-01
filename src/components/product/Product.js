import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart, addItemToCartError } from "../../redux/actions/CartActions";
import { toast } from 'react-toastify';
import axios from "axios";

const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const addItemIntoCart = (item) => {
    return (dispatch) => {
      axios.post('http://localhost:8000/cart', item).then(resp => {
        if (resp.data.id) {
          dispatch(addItemToCart(item));
          toast.success("Item added successfully!!", {
            autoClose: 2000,
            pauseOnHover: true,
          });
        }
      }).catch(error => {
        dispatch(addItemToCartError());
        toast.error("Error while adding item into the cart!!", {
          autoClose: 2000,
          pauseOnHover: true,
        });
      });
    }
  }
  return (
    <>
      <div className="card">
        <div className="image">
          <img src={product.image} alt={product.image} />
        </div>
        <div className="card-body content">
          <h5 className="card-title header">{product.title}</h5>
          <div className="price">${product.price}</div>
          <div className="category pb-2">{product.category}</div>
          <div className="text-right">
            <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline-dark mr-2">Details</Link>
            <button className="btn btn-sm btn-outline-primary" onClick={() => dispatch(addItemIntoCart(product))}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;

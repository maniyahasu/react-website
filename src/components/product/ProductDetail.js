import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { productDetail, removeSelectedProducts } from "../../redux/actions/ProductActions";
import Loader from '../shared/Loader';
import axios from "axios";
import Container from '../shared/Container';

const ProductDetail = () => {
  const { productId } = useParams();
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const fetchProductById = async () => {
    const product = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .catch((error) => {
        console.log("error white fetching product", error);
      });

    // dispatching actions to set products
    dispatch(productDetail(product.data));
  };
  useEffect(() => {
    if (productId && productId !== "" && productId !== null) {
      fetchProductById();
    }
    return () => {
        dispatch(removeSelectedProducts());
    }   
  }, [productId]);

  return (
    <Container>
      <div className="py-3">
        <div className="row">
          <div className="col-md-12 d-flex">
            <div className="pr-2">
              <NavLink to="/products">
                <i className="fas fa-arrow-left"></i>
              </NavLink>
            </div>
            <div>Product Details</div>
          </div>
        </div>
        {Object.keys(product).length > 0 ? (
          <div className="row pt-4">
            <div className="col-md-8">
                <div className="image-wrapper">
              <img src={product.image} alt={product.image} />
                </div>
            </div>
            <div className="col-md-4">
              <div className="h4 pb-2">{product.title}</div>
              <div className="pb-2">{product.description}</div>
              <div className="font-weight-bold">Price: $ {product.price}</div>
            </div>
          </div>
        ) : (
          <Loader height="70vh" />
        )}
      </div>
    </Container>
  );
};
export default ProductDetail;

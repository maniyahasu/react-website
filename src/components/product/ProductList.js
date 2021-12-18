import React from "react";
import { NavLink } from "react-router-dom";
import Product from "../product/Product";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../redux/actions/ProductActions";
import axios from "axios";
import Loader from "../shared/Loader";
import Container from '../shared/Container';

// Loading the list of products using react redux

const ProductList = (props) => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const fetchAllProduct = async () => {
    const products = await axios
      .get("https://fakestoreapi.com/products")
      .catch((error) => {
        console.log("error white fetching products", error);
      });

    // dispatching actions to set products
    dispatch(fetchAllProducts(products.data));
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);
  // console.log('Products', products);
  return (
    <>
      <Container>
        <div className="pt-3 d-flex">
          <div className="pr-2">
            <NavLink to="/">
              <i className="fas fa-arrow-left"></i>
            </NavLink>
          </div>
          <div>Product List</div>
        </div>
        <div className="body-content my-4 row">
          {products.length > 0 &&
            products.map((product) => (
              <div className="col-md-3 pb-3" key={product.id}>
                <Product product={product} />
              </div>
            ))}
            { products.length === 0 && <Loader height='60vh' />}
        </div>
      </Container>
    </>
  );
};

export default ProductList;

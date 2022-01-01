import React from "react";
import { NavLink } from "react-router-dom";
import Product from "../product/Product";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../redux/actions/ProductActions";
import axios from "axios";
import Loader from "../shared/Loader";
import Container from "../shared/Container";
import Filter from "../shared/Filter";

// Loading the list of products using react redux

const ProductList = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const fetchAllProduct = async () => {
    const products = await axios
      .get("https://fakestoreapi.com/products")
      .catch((error) => {
        console.log("error white fetching products", error);
      });

    const productsArray = products.data.map(product => {
      return {...product, quantity: 1}
    });
    // dispatching actions to set products
    dispatch(fetchAllProducts(productsArray));
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);
  // console.log('Products', products);
  return (
    <>
      <Container>
        <div className="pt-3 d-flex align-items-center justify-content-between">
          <div className="d-flex">
            <NavLink to="/" className="mr-2">
              <i className="fas fa-arrow-left"></i>
            </NavLink>
            <div>Product List</div>
          </div>
          <div>
            <Filter />
          </div>
        </div>
        <div className="body-content my-3 row">
          {products.length > 0 &&
            products.map((product) => (
              <div className="col-md-3 pb-3" key={product.id}>
                <Product product={product} />
              </div>
            ))}
          {products.length === 0 && <Loader height="60vh" />}
        </div>
      </Container>
    </>
  );
};

export default ProductList;

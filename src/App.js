import "./App.scss";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { Redirect } from 'react-router';
import { useState, useEffect } from "react";
import Home from "./components/home/Home";
import ProductDetail from "./components/product/ProductDetail";
import ProductList from './components/product/ProductList';
import Users from "./components/users/Users";
import Login from "./components/login/Login";
import Todo from "./redux/components/Todo";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./redux/components/cart/Cart";

const App = () => {
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);

  useEffect(() => {
    checkUserIsLoggedIn();
  }, [isUserLoggedIn]);

  const checkUserIsLoggedIn = () => {
    const flag = localStorage.getItem("isLoggedIn") || false;
    console.log("Is logged in", flag);
    flag ? setisUserLoggedIn(true) : setisUserLoggedIn(false);
  };

  const handleUserLoggedIn = (event) => {
    setisUserLoggedIn(event);
  };

  const handleUserLoggedOut = () => {
    localStorage.removeItem('isLoggedIn');
    setisUserLoggedIn(false);
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <Navbar isUserLoggedIn={isUserLoggedIn} onUserLoggedOut={handleUserLoggedOut} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={isUserLoggedIn ? <ProductList /> : <Navigate to="/" />} />
          <Route path="/user" element={<Users />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/login"
            element={<Login onUserLoggedIn={(e) => handleUserLoggedIn(e)} />}
          />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

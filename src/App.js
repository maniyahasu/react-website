import "./App.scss";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    const flag = localStorage.getItem("isLoggedIn");
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
        <Navbar isUserLoggedIn={isUserLoggedIn} onUserLoggedOut={handleUserLoggedOut}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
        <Routes>
          <Route path="/products" element={<ProductList />}></Route>
        </Routes>
        <Routes>
          <Route path="/user" element={<Users />}></Route>
        </Routes>
        <Routes>
          <Route
            path="/login"
            element={<Login onUserLoggedIn={(e) => handleUserLoggedIn(e)} />}
          ></Route>
        </Routes>
        <Routes>
          <Route path="/product/:productId" element={<ProductDetail />}></Route>
        </Routes>
        <Routes>
          <Route path="/todo" element={<Todo />}></Route>
        </Routes>
        <Routes>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

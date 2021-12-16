import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/home/Home";
import Product from "./components/product/Product";
import Users from "./components/users/Users";
import Login from "./components/login/Login";

function App() {
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
      <Router>
        <Navbar isUserLoggedIn={isUserLoggedIn} onUserLoggedOut={handleUserLoggedOut}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
        <Routes>
          <Route path="/product" element={<Product />}></Route>
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
      </Router>
    </>
  );
}

export default App;

import SignIn from "./components/SignIn";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import CreateProduct from "./components/CreateProduct";
import { UserContextProvider } from "./context/UserContext";
import SignUp from "./components/SignUp";
import ProductCard from "./components/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import Home from "./components/Home";
function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = "http://localhost:3000/bazar/auth/login/success";
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/registro" element={<SignUp />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/products" element={<ProductCard />} />
          <Route exact path="/home" element={<Home user={user} />} />
          
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;

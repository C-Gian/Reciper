import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Navbar.css";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <div className="nb nb-left">
        <img src="\assets\images\navbar\logo.png" alt="logo"></img>
        <img src="\assets\images\navbar\logotext.png" alt="logotext"></img>
      </div>
      <div className="nb nb-right">
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        {!cookies.access_token ? (
          <Link to="/auth">Login or Register</Link>
        ) : (
          <>
            <Link to="/saved-recipes">Saved Recipes</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

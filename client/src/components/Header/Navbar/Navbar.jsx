import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Navbar.css";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar-links">
      <Link to="/" className={`navbarc-link ${isActive("/") ? "active" : ""}`}>
        Home
      </Link>
      <Link
        to="/"
        className={`navbarc-link ${
          isActive("/random-recipes") ? "active" : ""
        }`}
      >
        Random Recipes
      </Link>
      <Link
        to={!cookies.access_token ? "/auth" : "/my-recipes"}
        className={`navbarc-link ${isActive("/my-recipes") ? "active" : ""}`}
      >
        My Recipes
      </Link>
      <Link
        to="/"
        className={`navbarc-link ${
          isActive("/search-recipes") ? "active" : ""
        }`}
      >
        Search Recipes
      </Link>
      <Link
        to={!cookies.access_token ? "/auth" : "/create-recipe"}
        className={`navbarc-link ${isActive("/create-recipe") ? "active" : ""}`}
      >
        Create Recipe
      </Link>
    </div>
  );
};

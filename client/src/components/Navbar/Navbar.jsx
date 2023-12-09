import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Navbar.css";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <h1>Example.com</h1>
      <ul className="nav">
        <li>Home</li>
        <li>About</li>
        <li>
          <a href="#getting-started">Getting started</a>
        </li>
        <li>
          <a href="#pricing">Pricing</a>
        </li>
        <li>
          <a href="#my-account">My account</a>
        </li>
        <li>Company</li>
        <li>Jobs</li>
        <li>Sign up</li>
        <li>Privacy policy</li>
      </ul>
    </aside>
  );
};

{
  /* <div className="navbar-links">
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
        to="/search-recipes"
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
    </div> */
}

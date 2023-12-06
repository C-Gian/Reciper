import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Navbar.css";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-links">
        <Link
          to="/"
          className={`navbarc-link ${isActive("/") ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          to={!cookies.access_token ? "/auth" : "/my-recipes"}
          className={`navbarc-link ${isActive("/my-recipes") ? "active" : ""}`}
        >
          My Recipes
        </Link>
        <Link
          to={!cookies.access_token ? "/auth" : "/create-recipe"}
          className={`navbarc-link ${
            isActive("/create-recipe") ? "active" : ""
          }`}
        >
          Create Recipe
        </Link>
      </div>
      <div className="navbar-rll">
        {!cookies.access_token ? (
          <Link to="/auth">
            <div className="navbar-notuser-container">
              <button className="navbar-rrl-button">
                <img
                  src="\assets\images\navbar\user_icon.png"
                  alt="user logged"
                />
              </button>
              <label>accedi</label>
            </div>
          </Link>
        ) : (
          <div className="navbar-user-container">
            <button onClick={logout} className="navbar-rrl-button">
              <img
                src="\assets\images\navbar\user_icon.png"
                alt="user logged"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

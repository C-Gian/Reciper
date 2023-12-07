import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Header.css";
import { Navbar } from "./Navbar/Navbar";

export const Header = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [searchQuery, setSearchQuery] = useState("");

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  const searchItems = (e) => {
    setSearchQuery(e);
  };

  return (
    <div className="header-container">
      <div className="header-t">
        <div className="headert-l">
          <img src="\assets\images\header\logo_1.png" alt=""></img>
          <h1>Reciper</h1>
        </div>
        <div className="headert-c">
          <form action="" className="headert-c-form">
            <input
              type="search"
              placeholder="Search Recipes"
              onChange={(e) => searchItems(e.target.value)}
            />
            <Link
              to={{
                pathname: "/search-recipes",
              }}
              state={searchQuery}
              className="headert-c-link"
            >
              <button type="submit">
                <img src="\assets\images\header\search_icon.png" alt="search" />
              </button>
            </Link>
          </form>
        </div>
        <div className="headert-r">
          {!cookies.access_token ? (
            <Link to="/auth">
              <div className="headert-notuser-container">
                <button className="headert-rrl-button">
                  <img
                    src="\assets\images\header\profile_icon.png"
                    alt="user logged"
                  />
                </button>
                <label>accedi</label>
              </div>
            </Link>
          ) : (
            <div className="headert-user-container">
              <button onClick={logout} className="headert-rrl-button">
                <img
                  src="\assets\images\header\profile_icon.png"
                  alt="user logged"
                />
              </button>
            </div>
          )}
        </div>
      </div>
      <Navbar></Navbar>
    </div>
  );
};

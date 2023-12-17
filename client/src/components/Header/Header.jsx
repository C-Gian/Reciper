import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Searchbar } from "../Searchbar/Searchbar";

export const Header = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="header-container">
      <Link className="h-left" to="/">
        <img src="\assets\images\Header\logo.png" alt="" />
        <h1>Reciper</h1>
      </Link>
      <div className="h-center">
        <Searchbar></Searchbar>
      </div>
      <div className="h-right">
        {!cookies.access_token ? (
          <Link to="/auth" className="hr-user-container">
            <div className="hr-notuser">
              <img
                src="\assets\images\header\profile_icon.png"
                alt="user logged"
              />
              <label>accedi</label>
            </div>
          </Link>
        ) : (
          <div className="hr-user-container">
            <button onClick={logout} className="hr-user">
              <img
                src="\assets\images\Header\profile_icon.png"
                alt="user logged"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

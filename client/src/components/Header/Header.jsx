import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Searchbar } from "../Searchbar/Searchbar";

export const Header = () => {
  return (
    <div className="header-container">
      <Link className="h-left" to="/">
        <img src="\assets\images\Header\logo.png" alt="" />
        <h1>Reciper</h1>
      </Link>
      <div className="h-center">
        <Searchbar></Searchbar>
      </div>
      <div className="h-right"></div>
    </div>
  );
};

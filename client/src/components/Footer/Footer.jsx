import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-l">
        <img src="" alt=""></img>
        <h1>Reciper</h1>
      </div>
      <div className="footer-r">
        <h1>Made by Gianluca Culaon</h1>
        <div className="footer-links">
          <img src="\assets\images\footer\git_icon.png" alt="github"></img>
          <img src="\assets\images\footer\li_icon.png" alt="linkedin"></img>
          <img src="\assets\images\footer\pf_icon.png" alt="portfolio"></img>
        </div>
      </div>
    </div>
  );
};

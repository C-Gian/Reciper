import React from "react";
import { Link } from "react-router-dom";
import "./QandA.css";

export const QandA = ({ qa }) => {
  return (
    <div className="qanda-container">
      <div className="qanda-t-container">
        <div className="qanda-userasking-container">
          <div className="qanda-userasking">
            <Link to="/">
              <img src="\assets\images\recipe\profile_icon.png"></img>
            </Link>
            <h1>{qa.user}</h1>
          </div>
          <p>{qa.message}</p>
        </div>
        <button>Reply</button>
      </div>
      <div className="qanda-replies-container">
        {qa.replies.map((reply, rIndex) => (
          <>
            <div className="qanda-reply-container" key={rIndex}>
              <div key={rIndex} className="qandar-container">
                <div className="qandar-user-replying">
                  <Link to="/">
                    <img src="\assets\images\recipe\profile_icon.png"></img>
                  </Link>
                  <h1>{reply.user}</h1>
                </div>
                <div className="qandar-userr-message">
                  <h1>{"@" + reply.user}</h1>
                  <p>{reply.message}</p>
                </div>
              </div>
              <button>Reply</button>
            </div>
            <div className="qanda-replies-divider"></div>
          </>
        ))}
      </div>
    </div>
  );
};

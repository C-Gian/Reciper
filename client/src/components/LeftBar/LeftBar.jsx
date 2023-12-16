import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./LeftBar.css";

export const LeftBar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="leftbar-container">
      <div className="lb-container">
        <div className="lb-links">
          <Link to="/" className={`lb-link ${isActive("/") ? "active" : ""}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="lb-icon">
              <g>
                <path
                  d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.904c0-.301-.158-.584-.408-.758z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
            <h1>Home</h1>
          </Link>
          <Link
            to="/explore"
            className={`lb-link ${isActive("/explore") ? "active" : ""}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="lb-icon">
              <g>
                <path
                  d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
            <h1>Explore</h1>
          </Link>
          <Link
            to="/notifications"
            className={`lb-link ${isActive("/notifications") ? "active" : ""}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="lb-icon">
              <g>
                <path
                  d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
            <h1>Notifications</h1>
          </Link>
          <Link
            to="/messages"
            className={`lb-link ${isActive("/messages") ? "active" : ""}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="lb-icon">
              <g>
                <path
                  d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
            <h1>Messages</h1>
          </Link>
          <Link
            to={!cookies.access_token ? "/auth" : "/my-recipes"}
            className={`lb-link ${isActive("/my-recipes") ? "active" : ""}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="lb-icon">
              <g>
                <path
                  d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
            <h1>My Recipes</h1>
          </Link>
        </div>
        <div className="lb-create">
          <Link
            to={!cookies.access_token ? "/auth" : "/create-recipe"}
            className={`lb-link ${isActive("/create-recipe") ? "active" : ""}`}
          >
            <svg
              aria-label="Create Recipe"
              className="lb-icon"
              role="img"
              viewBox="0 0 24 24"
            >
              <path
                d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="6.545"
                x2="17.455"
                y1="12.001"
                y2="12.001"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="12.003"
                x2="12.003"
                y1="6.545"
                y2="17.455"
              ></line>
            </svg>
            <h1>Create Recipe</h1>
          </Link>
        </div>
      </div>
    </aside>
  );
};

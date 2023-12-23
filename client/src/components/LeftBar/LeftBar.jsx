import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./LeftBar.css";
import axios from "axios";

export const LeftBar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [user, setUser] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auth/user`, {
          headers: { authorization: cookies.access_token },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error while fecthing recipe owner:", error);
      }
    };

    fetchLoggedUser();
  }, []);

  const handleSettingsClick = () => {
    setMenuOpen(!isMenuOpen);
  };

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
        {!cookies.access_token ? (
          <Link to="/auth" className="lb-profile">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width={30}
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M17.4399 14.62L19.9999 12.06L17.4399 9.5"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M9.76001 12.0601H19.93"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
            <h1>Login</h1>
          </Link>
        ) : (
          <div className="lb-profile" onClick={handleSettingsClick}>
            <img
              src="\assets\images\header\profile_icon.png"
              alt="user logged"
            />
            <h1>{user.username}</h1>
          </div>
        )}
        {isMenuOpen && (
          <ModalMenu
            isMenuOpen={isMenuOpen}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </div>
    </aside>
  );
};

const ModalMenu = ({ isMenuOpen, onClose }) => {
  const menuRef = useRef();
  const [cookies, setCookies] = useCookies(["access_token"]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        event.target.closest(".lb-profile") === null
      ) {
        onClose();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, onClose]);

  const logout = () => {
    closeMenu();
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
  };

  const closeMenu = () => {
    onClose();
  };

  return (
    <div ref={menuRef} className="lb-profile-modal">
      <div className="lbpm-container">
        <Link to="/profile" onClick={closeMenu} className="lbpm-item">
          <div className="lbpm-svg">
            <svg
              width="21px"
              height="21px"
              viewBox="0 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <title>profile [#1341]</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="white"
                fillRule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-180.000000, -2159.000000)"
                  fill="#FFF"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298"
                      id="profile-[#1341]"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <h1>Profile</h1>
        </Link>
        <Link to="/settings" onClick={closeMenu} className="lbpm-item">
          <div className="lbpm-svg">
            <svg
              fill="#FFF"
              width="24px"
              height="24px"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m1739.34 1293.414-105.827 180.818-240.225-80.188-24.509 22.25c-69.91 63.586-150.211 109.666-238.644 136.771l-32.076 9.94-49.468 244.065H835.584l-49.468-244.179-32.076-9.939c-88.432-27.105-168.734-73.185-238.644-136.771l-24.508-22.25-240.226 80.189-105.826-180.82 189.74-164.442-7.453-32.978c-10.39-45.742-15.586-91.483-15.586-135.869 0-44.386 5.195-90.127 15.586-135.868l7.454-32.979-189.741-164.442 105.826-180.819 240.226 80.075 24.508-22.25c69.91-63.585 150.212-109.665 238.644-136.884l32.076-9.826 49.468-244.066h213.007l49.468 244.18 32.076 9.825c88.433 27.219 168.734 73.186 238.644 136.885l24.509 22.25 240.225-80.189 105.826 180.819-189.74 164.442 7.453 32.98c10.39 45.74 15.586 91.481 15.586 135.867 0 44.386-5.195 90.127-15.586 135.869l-7.454 32.978 189.741 164.556Zm-53.76-333.403c0-41.788-3.84-84.48-11.634-127.284l210.184-182.062-199.454-340.856-265.186 88.433c-66.974-55.567-143.322-99.388-223.85-128.414L1140.977.01H743.198l-54.663 269.704c-81.431 29.139-156.424 72.282-223.963 128.414L199.5 309.809.045 650.665l210.07 182.062c-7.68 42.804-11.52 85.496-11.52 127.284 0 41.789 3.84 84.48 11.52 127.172L.046 1269.357 199.5 1610.214l265.186-88.546c66.974 55.68 143.323 99.388 223.85 128.527l54.663 269.816h397.779l54.663-269.703c81.318-29.252 156.424-72.283 223.85-128.527l265.186 88.546 199.454-340.857-210.184-182.174c7.793-42.805 11.633-85.496 11.633-127.285ZM942.075 564.706C724.1 564.706 546.782 742.024 546.782 960c0 217.976 177.318 395.294 395.294 395.294 217.977 0 395.294-177.318 395.294-395.294 0-217.976-177.317-395.294-395.294-395.294m0 677.647c-155.633 0-282.353-126.72-282.353-282.353s126.72-282.353 282.353-282.353S1224.43 804.367 1224.43 960s-126.72 282.353-282.353 282.353"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <h1>Settings</h1>
        </Link>
        <Link to="/auth" onClick={logout} className="lbpm-item">
          <div className="lbpm-svg">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 6.5C2 4.01472 4.01472 2 6.5 2H12C14.2091 2 16 3.79086 16 6V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6C14 4.89543 13.1046 4 12 4H6.5C5.11929 4 4 5.11929 4 6.5V17.5C4 18.8807 5.11929 20 6.5 20H12C13.1046 20 14 19.1046 14 18V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V18C16 20.2091 14.2091 22 12 22H6.5C4.01472 22 2 19.9853 2 17.5V6.5ZM18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071C17.9024 15.3166 17.9024 14.6834 18.2929 14.2929L19.5858 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L19.5858 11L18.2929 9.70711C17.9024 9.31658 17.9024 8.68342 18.2929 8.29289Z"
                  fill="#FFF"
                />
              </g>
            </svg>
          </div>
          <h1>Logout</h1>
        </Link>
      </div>
    </div>
  );
};

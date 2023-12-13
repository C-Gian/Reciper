import React from "react";
import "./RecipePost.css";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export const RecipePost = ({ recipe, index }) => {
  const {
    imageUrl,
    title,
    prepTime,
    cookTime,
    chillTime,
    description,
    ingredients,
    price,
  } = recipe;
  const likes = 745;
  const comments = 123;
  const saved = 54;

  return (
    <div className="recipepost-container">
      <div className="rp-t">
        <div className="rph-imginfos">
          <Link to="/profile">
            <img src="\assets\images\leftbar\profile_icon.png" alt="" />
          </Link>
          <div className="rph-infos">
            <h1>Gabriella Monez</h1>
            <h3>2h</h3>
          </div>
        </div>
        <div className="rph-dots">
          <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
            <g fill-rule="evenodd" transform="translate(-446 -350)">
              <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
            </g>
          </svg>
        </div>
      </div>
      <div className="rp-c">
        <div className="rpc-l">
          <div className="rpcl-t">
            <h1 className="rpcl-title">{title}</h1>
            <h1 className="rpcl-description">{description.slice(0, 200)}</h1>
          </div>
          <div className="rpcl-b">
            <div className="rpcli-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                width={30}
                height={30}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M9 2H15"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M15.24 10.76L12 14"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
              <h1>Time</h1>
              <label>{prepTime + cookTime + chillTime}m</label>
            </div>
            <div className="rpcli-item">
              <svg
                fill="#ffffff"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                stroke="#ffffff"
                width={30}
                height={30}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M26 3 A 1.0001 1.0001 0 0 0 25 4L25 7.6972656L21.167969 13.445312 A 1.0001 1.0001 0 0 0 21.166016 13.447266 A 1.0001 1.0001 0 0 0 21.130859 13.505859 A 1.0001 1.0001 0 0 0 21.111328 13.542969 A 1.0001 1.0001 0 0 0 21.105469 13.558594 A 1.0001 1.0001 0 0 0 21.037109 13.732422 A 1.0001 1.0001 0 0 0 21.033203 13.748047 A 1.0001 1.0001 0 0 0 21.017578 13.816406 A 1.0001 1.0001 0 0 0 21.003906 13.90625 A 1.0001 1.0001 0 0 0 21.003906 13.914062 A 1.0001 1.0001 0 0 0 21 14 A 1.0001 1.0001 0 0 0 21 14.011719L21 20L5 20 A 1.0001 1.0001 0 0 0 4 21L4 45 A 1.0001 1.0001 0 0 0 5 46L14.275391 46C15.040306 46.872658 15.962077 47.569588 16.976562 48.027344C19.557836 49.192064 22.896153 48.926876 25.537109 46.894531 A 1.0001 1.0001 0 0 0 26 47L39 47L45 47 A 1.0001 1.0001 0 0 0 46 46L46 14 A 1.0001 1.0001 0 0 0 45.894531 13.552734L43 7.7636719L43 4 A 1.0001 1.0001 0 0 0 42 3L26 3 z M 27 5L41 5L41 7L27 7L27 5 z M 26.535156 9L40.382812 9L38.382812 13L23.869141 13L26.535156 9 z M 42 10.236328L44 14.236328L44 45L40 45L40 14.236328L42 10.236328 z M 23 15L38 15L38 45L27.378906 45C27.836847 44.384682 28.253606 43.697922 28.605469 42.917969C29.82748 40.209741 30.243093 37.066535 29.869141 34.294922C29.495189 31.523309 28.310947 29.004254 26.023438 27.972656C25.451584 27.714611 24.856442 27.571327 24.248047 27.523438C23.836595 27.49105 23.419451 27.509295 23 27.560547L23 21L23 15 z M 6 22L21 22L21 28 A 1.0001 1.0001 0 0 0 21.003906 28.082031C20.230505 28.384537 19.468236 28.786964 18.740234 29.273438C16.41485 30.827333 14.331355 33.219577 13.109375 35.927734C11.755522 38.92815 11.922502 41.766212 12.96875 44L6 44L6 22 z M 24.064453 29.527344C24.475261 29.553208 24.857775 29.64192 25.201172 29.796875C26.574663 30.416278 27.567171 32.19216 27.886719 34.560547C28.206267 36.928934 27.832189 39.770931 26.783203 42.095703C24.705876 46.700399 20.586111 47.462754 17.798828 46.205078C15.011465 44.947365 12.854414 41.353558 14.931641 36.75C15.980661 34.425157 17.864447 32.265354 19.851562 30.9375C20.845122 30.273573 21.838486 29.833234 22.755859 29.636719C23.214546 29.538461 23.653646 29.501479 24.064453 29.527344 z"></path>
                </g>
              </svg>
              <h1>Ingredients</h1>
              <label>{ingredients.length}</label>
            </div>
            <div className="rpcli-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                width={30}
                height={30}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 6V18"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9V15C22 20 20 22 15 22Z"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
              <h1>Price</h1>
              <label>{price}$</label>
            </div>
          </div>
        </div>
        <div className="rpc-r">
          <img src={imageUrl} alt={title} />
        </div>
      </div>
      <div className="rp-b">
        <div className="rpb-t">
          <div className="rpbt-item">
            <svg viewBox="0 0 24 24" ariaHidden="true" width={20} fill="white">
              <g>
                <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
              </g>
            </svg>
            <label>{likes}</label>
          </div>
          <div className="rpbt-divider"></div>
          <div className="rpbt-item">
            <svg viewBox="0 0 24 24" ariaHidden="true" width={20} fill="white">
              <g>
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
              </g>
            </svg>
            <label>{comments}</label>
          </div>
          <div className="rpbt-divider"></div>
          <div className="rpbt-item">
            <svg viewBox="0 0 24 24" ariaHidden="true" width={20} fill="white">
              <g>
                <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
              </g>
            </svg>
            <label>{saved}</label>
          </div>
        </div>
        <div className="rpb-b"></div>
      </div>
    </div>
  );
};

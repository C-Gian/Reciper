import React, { useState } from "react";
import "./RecipePost.css";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { RecipeModal } from "../index";
import axios from "axios";
import { useCookies } from "react-cookie";

export const RecipePost = ({ recipe, index, likedRecipes, savedRecipes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [isLiked, setIsLiked] = useState(
    likedRecipes.includes(recipe._id) ? true : false
  );
  const [isSaved, setIsSaved] = useState(
    savedRecipes.includes(recipe._id) ? true : false
  );
  const {
    _id,
    imageUrl,
    title,
    prepTime,
    cookTime,
    chillTime,
    totalRatings,
    ratingVote,
    description,
    ingredients,
    likes,
    saved,
    price,
  } = recipe;
  const comments = 123;

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const updateLikes = async () => {
    if (isLiked) {
      try {
        await axios.put(
          "http://localhost:3001/recipe/update-likes",
          {
            newLikesTotal: likes - 1,
            recipeID: recipe._id,
          },
          { headers: { authorization: cookies.access_token } }
        );
        await axios.put(
          "http://localhost:3001/auth/edit-liked-recipe",
          {
            recipeId: recipe._id,
            toAdd: false,
          },
          { headers: { authorization: cookies.access_token } }
        );
        console.log("Like removed successfully");
        recipe.likes -= 1;
        setIsLiked(false);
      } catch (error) {
        console.error("Error removing like", error);
      }
    } else {
      try {
        await axios.put(
          "http://localhost:3001/recipe/update-likes",
          {
            newLikesTotal: likes + 1,
            recipeID: recipe._id,
          },
          { headers: { authorization: cookies.access_token } }
        );
        await axios.put(
          "http://localhost:3001/auth/edit-liked-recipe",
          {
            recipeId: recipe._id,
            toAdd: true,
          },
          { headers: { authorization: cookies.access_token } }
        );
        console.log("Liked successfully");
        recipe.likes += 1;
        setIsLiked(true);
      } catch (error) {
        console.error("Error adding like", error);
      }
    }
  };

  const updateSaved = async () => {
    if (isSaved) {
      try {
        await axios.put(
          "http://localhost:3001/recipe/update-saved",
          {
            newSavedTotal: saved - 1,
            recipeID: recipe._id,
          },
          { headers: { authorization: cookies.access_token } }
        );
        await axios.put(
          "http://localhost:3001/auth/edit-saved-recipe",
          {
            recipeId: recipe._id,
            toAdd: false,
          },
          { headers: { authorization: cookies.access_token } }
        );
        console.log("recipe removed from saved successfully");
        recipe.saved -= 1;
        setIsSaved(false);
      } catch (error) {
        console.error("Error removing recipe save", error);
      }
    } else {
      try {
        await axios.put(
          "http://localhost:3001/recipe/update-saved",
          {
            newSavedTotal: saved + 1,
            recipeID: recipe._id,
          },
          { headers: { authorization: cookies.access_token } }
        );
        await axios.put(
          "http://localhost:3001/auth/edit-saved-recipe",
          {
            recipeId: recipe._id,
            toAdd: true,
          },
          { headers: { authorization: cookies.access_token } }
        );
        console.log("Recipe saved successfully");
        recipe.saved += 1;
        setIsSaved(true);
      } catch (error) {
        console.error("Error adding recipe save", error);
      }
    }
  };

  return (
    <div>
      <div className="recipepost-container">
        <div className="rp-t">
          <Link
            className="rpt-t"
            to={{
              pathname: "/recipe",
            }}
            state={recipe}
          >
            <img src={imageUrl} alt={title} />
          </Link>
          <div className="rpt-b">
            <Link to="/profile" className="rptb-img">
              <img src="\assets\images\recipecard\profile_icon.png" alt="" />
            </Link>
            <Link
              className="rptb-infos"
              to={{
                pathname: "/recipe",
              }}
              state={recipe}
            >
              <h1>{title}</h1>
              <div className="rptbi-rating">
                <Rating
                  size={17}
                  initialValue={ratingVote}
                  allowFraction={true}
                  readonly={true}
                />
                <label>{Math.floor(ratingVote * 10) / 10}</label>
                <label>{`(${totalRatings})`}</label>
              </div>
            </Link>
          </div>
        </div>
        <div className="rp-b">
          <div className="rpb-item" onClick={updateLikes}>
            {isLiked ? (
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1080.000000 1080.000000"
                preserveAspectRatio="xMidYMid meet"
                width={20}
                fill="white"
                className={`rpbi-like ${isLiked ? "rpbi-liked" : ""}`}
              >
                <g
                  transform="translate(0.000000,1080.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M3030 9351 c-393 -58 -722 -184 -1047 -402 -232 -156 -459 -380 -625
             -615 -216 -306 -372 -713 -434 -1126 -25 -169 -29 -495 -10 -688 164 -1612
             1496 -3247 3826 -4697 124 -77 275 -168 335 -203 61 -34 158 -92 218 -127
             l107 -64 208 122 c447 264 947 586 1260 811 1360 977 2275 2003 2722 3053 230
             539 336 1096 302 1587 -26 378 -106 686 -257 993 -155 315 -353 573 -610 793
             -362 310 -810 507 -1295 567 -185 23 -509 17 -703 -14 -545 -87 -1070 -354
             -1518 -771 l-109 -102 -99 92 c-463 428 -977 692 -1523 781 -190 31 -570 36
             -748 10z"
                  />
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                width={20}
                fill="white"
                className={`rpbi-like ${isLiked ? "rpbi-liked" : ""}`}
              >
                <g>
                  <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </g>
              </svg>
            )}
            <label className={`rpbi-like ${isLiked ? "rpbi-liked" : ""}`}>
              {likes}
            </label>
          </div>
          <div className="rpb-divider"></div>
          <div className="rpb-item rpbi-comments" onClick={openModal}>
            <svg viewBox="0 0 24 24" aria-hidden="true" width={20} fill="white">
              <g>
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
              </g>
            </svg>
            <label>{comments}</label>
          </div>
          <div className="rpb-divider"></div>
          <div className="rpb-item" onClick={updateSaved}>
            {isSaved ? (
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1080.000000 1080.000000"
                preserveAspectRatio="xMidYMid meet"
                width={20}
                className={`rpbi-save ${isSaved ? "rpbi-saved" : ""}`}
              >
                <g
                  transform="translate(0.000000,1080.000000) scale(0.100000,-0.100000)"
                  stroke="none"
                >
                  <path
                    d="M2708 10090 c-212 -44 -364 -119 -525 -258 -157 -135 -293 -356 -351
-567 l-27 -100 -3 -4234 c-2 -3401 0 -4232 10 -4228 7 2 817 579 1801 1280
l1787 1276 1787 -1276 c984 -701 1794 -1278 1800 -1280 17 -7 19 8273 3 8407
-48 391 -277 716 -627 890 -90 44 -178 73 -294 95 -72 13 -374 15 -2678 14
-2480 0 -2600 -1 -2683 -19z"
                  />
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                width={20}
                className={`rpbi-save ${isSaved ? "rpbi-saved" : ""}`}
              >
                <g>
                  <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                </g>
              </svg>
            )}
            <label>{saved}</label>
          </div>
        </div>
      </div>
      {modalOpen && (
        <RecipeModal
          recipe={recipe}
          onClose={closeModal}
          isLiked={isLiked}
          isSaved={isSaved}
          updateLikes={updateLikes}
          updateSaved={updateSaved}
        />
      )}
    </div>
  );
};

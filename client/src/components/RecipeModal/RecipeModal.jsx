import React from "react";
import "./RecipeModal.css";
import { Rating } from "react-simple-star-rating";

export const RecipeModal = ({ recipe, onClose }) => {
  const likes = 745;
  const comments = 123;
  const saved = 54;
  console.log(recipe);
  return (
    <div className="recipemodal-container" onClick={onClose}>
      <div className="rp-container" onClick={(e) => e.stopPropagation()}>
        <div className="rpc-l">
          <div className="rpcl-t">
            <div className="rpclt-profinfos">
              <div className="rpclt-prof">
                <img
                  src="\assets\images\recipecard\profile_icon.png"
                  alt="user"
                />
              </div>
              <div className="rpclt-infos">
                <h1>{recipe.title}</h1>
                <div className="rpclt-rating">
                  <Rating
                    size={25}
                    initialValue={recipe.ratingVote}
                    allowFraction={true}
                    readonly={true}
                  />
                  <label>{Math.floor(recipe.ratingVote * 10) / 10}</label>
                  <label>{`(${recipe.totalRatings})`}</label>
                </div>
              </div>
            </div>
            <div className="rpclt-img">
              <img src={recipe.imageUrl} alt="recipe image" />
            </div>
          </div>
          <div className="rpcl-b">
            <div className="rpclb-item">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                width={20}
                fill="white"
              >
                <g>
                  <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </g>
              </svg>
              <label>{likes}</label>
            </div>
            <div className="rpclb-divider"></div>
            <div className="rpclb-item">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                width={20}
                fill="white"
              >
                <g>
                  <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                </g>
              </svg>
              <label>{saved}</label>
            </div>
          </div>
        </div>
        <div className="rpc-r">
          <div className="rpcr-header">
            <h1>Comments</h1>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M18.707 5.293a1 1 0 0 0-1.414 0L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0 0-1.414z"></path>
            </svg>
          </div>
          <div className="rpcr-comments">
            {recipe.comments.map((comment, cIndex) => {
              <div className="rpcr-comment" key={cIndex}>
                <h1>{comment.content}</h1>
                <div>
                  {comment.replies.map((reply, rIndex) => {
                    <div className="rpcrc-reply" key={rIndex}>
                      {reply.content}
                    </div>;
                  })}
                </div>
              </div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

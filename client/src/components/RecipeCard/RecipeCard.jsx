import React from "react";
import "./RecipeCard.css";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export const RecipeCard = ({ recipe, index, size }) => {
  const {
    imageUrl,
    title,
    prepTime,
    cookTime,
    chillTime,
    description,
    instructions,
    ingredients,
    ratingVote,
    totalRatings,
    difficulty,
    price,
    type,
    healthy,
  } = recipe;
  return (
    <div className="recipe-container" style={{ width: size.w }}>
      <Link
        to={{
          pathname: "/recipe",
        }}
        state={recipe}
        key={index}
      >
        <div className="recipe-t-container" style={{ height: size.h }}>
          <img src={imageUrl} alt={title}></img>
          <div className="recipet-saveicon">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="1000.000000pt"
              height="887.000000pt"
              viewBox="0 0 1000.000000 887.000000"
              preserveAspectRatio="xMidYMid meet"
              className="recipet-heart-icon"
            >
              <g
                transform="translate(0.000000,887.000000) scale(0.100000,-0.100000)"
                fill="#e1e1e1"
                stroke="none"
              >
                <path
                  className="recipet-heart-outline"
                  d="M6960 8385 c-8 -2 -71 -11 -140 -20 -171 -22 -343 -65 -520 -128 -47
-16 -103 -36 -125 -44 -81 -28 -374 -179 -500 -256 -210 -130 -495 -351 -654
-508 l-27 -27 -84 76 c-47 41 -130 111 -185 155 -55 44 -101 84 -103 88 -2 5
-8 9 -14 9 -5 0 -17 7 -26 17 -27 26 -289 196 -392 253 -89 50 -314 160 -327
160 -3 0 -19 6 -36 14 -121 54 -428 140 -587 165 -81 13 -384 29 -465 24 -258
-15 -326 -24 -496 -67 -98 -25 -197 -53 -220 -64 -24 -10 -60 -25 -79 -32 -57
-20 -220 -100 -295 -144 -395 -231 -699 -557 -901 -966 -51 -103 -48 -98 -82
-181 -67 -166 -108 -337 -142 -594 -15 -111 -12 -426 6 -545 8 -58 19 -136 24
-175 11 -85 91 -364 131 -459 16 -37 29 -72 29 -77 0 -10 131 -279 157 -324
10 -16 37 -64 61 -105 51 -90 198 -304 265 -386 186 -227 277 -320 2029 -2071
l1683 -1683 45 0 45 0 1756 1757 c965 967 1782 1789 1815 1827 32 37 68 78 79
91 39 44 60 71 143 185 45 63 90 126 100 138 99 135 274 469 345 657 101 269
144 445 177 715 13 109 13 381 0 490 -47 390 -172 739 -373 1040 -116 174
-326 400 -472 510 -33 25 -61 48 -63 52 -3 6 -105 71 -252 159 -183 110 -470
207 -755 255 -91 16 -528 30 -575 19z m460 -545 c119 -18 284 -62 390 -102
148 -56 342 -161 429 -233 61 -50 217 -191 224 -202 5 -8 26 -32 48 -55 32
-34 112 -146 166 -233 18 -29 108 -213 127 -260 9 -21 35 -105 57 -185 33
-121 42 -171 51 -302 15 -220 -1 -442 -42 -603 -17 -66 -37 -142 -44 -170 -21
-81 -110 -295 -174 -417 -54 -104 -195 -336 -211 -348 -3 -3 -31 -39 -61 -80
-30 -41 -88 -115 -129 -165 -41 -49 -791 -807 -1666 -1683 l-1592 -1593 -1563
1563 c-859 860 -1593 1595 -1630 1635 -106 114 -331 421 -391 534 -8 15 -27
51 -44 80 -96 176 -179 392 -224 587 -47 203 -56 274 -55 467 1 154 5 198 27
305 38 177 45 202 89 320 162 426 476 764 895 964 204 97 514 166 753 166 94
0 315 -24 370 -40 19 -5 46 -10 61 -10 26 0 270 -74 344 -105 80 -33 257 -117
265 -126 3 -3 26 -15 52 -28 51 -24 312 -196 364 -239 17 -15 54 -45 80 -67
85 -71 198 -172 229 -205 37 -39 141 -121 175 -138 97 -47 201 -61 289 -38
120 31 156 54 320 209 57 54 147 133 200 175 53 43 105 85 116 95 23 20 194
137 201 137 3 0 20 11 38 25 18 14 38 25 44 25 7 0 12 4 12 8 0 4 15 15 33 23
17 9 93 46 167 83 134 68 156 77 325 134 140 46 309 82 505 106 55 7 308 -2
380 -14z"
                />
              </g>
              <g
                transform="translate(0.000000,887.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  className="recipet-heart-fill"
                  fill="red"
                  d="M6960 8385 c-8 -2 -71 -11 -140 -20 -171 -22 -343 -65 -520 -128 -47
-16 -103 -36 -125 -44 -81 -28 -374 -179 -500 -256 -210 -130 -495 -351 -654
-508 l-27 -27 -84 76 c-47 41 -130 111 -185 155 -55 44 -101 84 -103 88 -2 5
-8 9 -14 9 -5 0 -17 7 -26 17 -27 26 -289 196 -392 253 -89 50 -314 160 -327
160 -3 0 -19 6 -36 14 -121 54 -428 140 -587 165 -81 13 -384 29 -465 24 -258
-15 -326 -24 -496 -67 -98 -25 -197 -53 -220 -64 -24 -10 -60 -25 -79 -32 -57
-20 -220 -100 -295 -144 -395 -231 -699 -557 -901 -966 -51 -103 -48 -98 -82
-181 -67 -166 -108 -337 -142 -594 -15 -111 -12 -426 6 -545 8 -58 19 -136 24
-175 11 -85 91 -364 131 -459 16 -37 29 -72 29 -77 0 -10 131 -279 157 -324
10 -16 37 -64 61 -105 51 -90 198 -304 265 -386 186 -227 277 -320 2029 -2071
l1683 -1683 45 0 45 0 1756 1757 c965 967 1782 1789 1815 1827 32 37 68 78 79
91 39 44 60 71 143 185 45 63 90 126 100 138 99 135 274 469 345 657 101 269
144 445 177 715 13 109 13 381 0 490 -47 390 -172 739 -373 1040 -116 174
-326 400 -472 510 -33 25 -61 48 -63 52 -3 6 -105 71 -252 159 -183 110 -470
207 -755 255 -91 16 -528 30 -575 19z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="recipe-b-container">
          <div className="recipeb-tti-container">
            <div className="recipeb-type-container">
              <label>{type}</label>
            </div>
            <div className="recipeb-ti-container">
              <div className="recipebti-time">
                <img src="assets\images\recipecard\time_icon.png"></img>
                <label>{prepTime + cookTime + chillTime}</label>
              </div>
              <div className="recipebti-ingredients">
                <img src="assets\images\recipecard\ingredients_icon.png"></img>
                <label>{ingredients.length}</label>
              </div>
            </div>
          </div>
          <h1>{title}</h1>
          <div className="recipeb-rating">
            <Rating
              size={20}
              initialValue={ratingVote}
              allowFraction={true}
              readonly={true}
            />
            <label>{Math.floor(ratingVote * 10) / 10}</label>
            <label>{`(${totalRatings})`}</label>
          </div>
          {/* <div className="recipeb-infos">
            <div className="recipebinfo">
              <img src="assets\images\recipes\price_icon.png" alt="price"></img>
              <h1>Price</h1>
              <label>
                {price <= 5 ? "low" : price <= 10 ? "medium" : "high"}
              </label>
            </div>
            <div className="recipebinfo">
              <img
                src="assets\images\recipes\difficulty_icon.png"
                alt="price"
              ></img>
              <h1>Difficulty</h1>
              <label>{difficulty}</label>
            </div>
            <div className="recipebinfo">
              <img
                src="assets\images\recipes\healthy_icon.png"
                alt="price"
              ></img>
              <h1>Healthy</h1>
              <label>{healthy ? "yes" : "no"}</label>
            </div>
          </div> */}
          {/* <button
          onClick={() => saveRecipe(recipe._id)}
          disabled={isRecipeSaved(recipe._id)}
          >
            {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            Save
          </button> */}
        </div>
      </Link>
    </div>
  );
};

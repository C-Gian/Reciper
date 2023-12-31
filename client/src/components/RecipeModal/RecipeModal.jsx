import React, { useEffect, useRef, useState } from "react";
import "./RecipeModal.css";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useLocation } from "react-router-dom";
import { RecipePost } from "../../components/index";

export const RecipeModal = ({
  recipe,
  onClose,
  isLiked,
  isSaved,
  updateLikes,
  updateSaved,
}) => {
  const comments = 123;
  const desc =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley oftype and scrambled it to make a type specimen book. It hassurvived not only five centuries, but also the leap intoelectronic typesetting, remaining essentially unchanged. It waspopularised in the 1960s with the release of Letraset sheetscontaining Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  const [recipeOwner, setRecipeOwner] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const qas = [
    {
      user: "CELIA DEPTULA",
      message: "How do I store these?",
      replies: [
        {
          user: "PALATABLEPASTIME",
          replyTo: "CELIA DEPTULA",
          message:
            "I store chewy cookies in a sealed plastic container. Keeps them fresh longer.",
        },
        {
          user: "DOGMOPKC",
          replyTo: "PALATABLEPASTIME",
          message: "could I use these as a bar cookie? Would I use a 9x12 pan?",
        },
        {
          user: "IRA4KIDS",
          replyTo: "DOGMOPKC",
          message:
            "I would like to cut back on the sugar, any problems an/or soultions?",
        },
        {
          user: "STEFCLARK88",
          replyTo: "IRA4KIDS",
          message:
            "This says drop by teaspoonful, not Tablespoon, is that correct?",
        },
      ],
    },
    {
      user: "PIGGYPETE",
      message: "How can I make this recipe printable",
      replies: [],
    },
    {
      user: "COOKINGAFICIONADO",
      message: "What's the best substitute for cream in this recipe?",
      replies: [
        {
          user: "DAIRYFREEEATER",
          replyTo: "COOKINGAFICIONADO",
          message:
            "You can try using coconut milk as a dairy-free alternative.",
        },
        {
          user: "HEALTHYCHOICES",
          replyTo: "DAIRYFREEEATER",
          message: "Consider almond milk for a lighter option.",
        },
      ],
    },
    {
      user: "CHEFSPECIALIST",
      message: "Can I use olive oil instead of butter in baking?",
      replies: [
        {
          user: "OLIVEOILEXPERT",
          replyTo: "CHEFSPECIALIST",
          message:
            "Yes, you can use olive oil, but be mindful of the flavor impact.",
        },
      ],
    },
    {
      user: "FITNESSFOODIE",
      message: "What's a healthy alternative to sugar in desserts?",
      replies: [
        {
          user: "NATURALSWEEETENER",
          replyTo: "FITNESSFOODIE",
          message:
            "Consider using natural sweeteners like honey or maple syrup.",
        },
      ],
    },
    {
      user: "GLOBALFLAVORS",
      message: "Any tips for making a perfect curry?",
      replies: [
        {
          user: "CURRYEXPERT",
          replyTo: "GLOBALFLAVORS",
          message: "Balance the spices and let it simmer for rich flavors.",
        },
      ],
    },
    {
      user: "BAKINGENTHUSIAST",
      message: "How do I achieve a flaky pie crust?",
      replies: [
        {
          user: "PASTRYPRO",
          replyTo: "BAKINGENTHUSIAST",
          message:
            "Use cold butter and don't overwork the dough for a flaky crust.",
        },
      ],
    },
  ];
  const reviews = [
    {
      user: "CELIA DEPTULA",
      rating: 5,
      message: "I gave 5 stars cause it's fantastic",
    },
    {
      user: "JOHN DOE",
      rating: 4,
      message: "Great experience overall!",
    },
    {
      user: "ALICE SMITH",
      rating: 3,
      message: "Not bad, but could be better.",
    },
    {
      user: "BOB JOHNSON",
      rating: 2,
      message: "Disappointing service.",
    },
    {
      user: "EMMA WILLIAMS",
      rating: 5,
      message: "Absolutely loved it!",
    },
    {
      user: "DAVID BROWN",
      rating: 1,
      message: "Terrible experience. Would not recommend.",
    },
  ];
  const [rating, setRating] = useState(recipe.ratingVote);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const PAGE_SIZE = 3; // or whatever you like
  const [qasIndex, setQasIndexndex] = useState(0);
  const [reviewsIndex, setReviewsIndex] = useState(0);
  const [qasVisibleData, setQasVisibleData] = useState([]);
  const [reviewsVisibleData, setReviewsVisibleData] = useState([]);

  useEffect(() => {
    const fetchRecipeOwner = async () => {
      try {
        const userID = recipe.userOwner;
        const response = await axios.get(
          `http://localhost:3001/auth/recipe-owner/${userID}`,
          { headers: { authorization: cookies.access_token } }
        );
        setRecipeOwner(response.data.username);
      } catch (error) {
        console.error("Error while fecthing recipe owner:", error);
      }
    };

    fetchRecipeOwner();
  }, []);

  useEffect(() => {
    const fectRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRelatedRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fectRecipes();
  }, []);

  const updateReview = async (recipeID, vote) => {
    try {
      // Invia una richiesta PUT al server per aggiornare la ricetta
      const response = await axios.put(
        "http://localhost:3001/recipe/updateReview",
        {
          newReviewVote:
            (recipe.ratingVote * recipe.totalRatings + vote) /
            (recipe.totalRatings + 1),
          newTotalReviews: recipe.totalRatings + 1,
          recipeID: recipeID,
        }
      );
      console.log("Aggiornato con successo", response);
    } catch (error) {
      console.error("Errore durante l aggiornamento della valutazione:", error);
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
    updateReview(recipe._id, rate);
  };

  const ConvertiMinuti = (minuti) => {
    const convertiMinutiInOreEMinuti = (minuti) => {
      const ore = Math.floor(minuti / 60);
      const minutiRimanenti = minuti % 60;

      if (ore > 0 && minutiRimanenti > 0) {
        return `${ore} ore e ${minutiRimanenti} minuti`;
      } else if (ore > 0) {
        return `${ore} ore`;
      } else {
        return `${minutiRimanenti} minuti`;
      }
    };
    const risultato = convertiMinutiInOreEMinuti(minuti);
    return risultato;
  };

  return (
    <div className="recipemodal-container">
      <div className="rmc-closebutton">
        <button onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={30}
            viewBox="0 0 24 24"
            stroke="rgba(255, 255, 255, 0.7)"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="rmc-recipefull">
        <div className="rmcr-left">
          <div className="rmcrl-left">
            <h1 className="rmcrm-title">{recipe.title}</h1>
            <div className="rmcrm-starsreviews">
              <div className="rmcrms-stars">
                <Rating
                  size={25}
                  onClick={handleRating}
                  initialValue={rating}
                  allowFraction={true}
                />
                <label>{Math.floor(recipe.ratingVote * 10) / 10}</label>
                <label>{`(${recipe.totalRatings})`}</label>
              </div>
              <div className="rmcrms-divider"></div>
              <div className="rmcrms-reviews">
                <label>114 Reviews</label>
              </div>
            </div>
            <p className="rmcrm-description">{desc.slice(0, 350)}</p>
            <img
              className="rmcrm-img-main"
              src={recipe.imageUrl}
              alt={recipe.title}
            ></img>
            <div className="rmwl-likedsaved">
              <div className="rmwll-left-container">
                <div className="rmwll-left" onClick={updateLikes}>
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
                    {recipe.likes}
                  </label>
                </div>
              </div>
              <div className="rmwll-right-container">
                <div className="rmwll-right" onClick={updateSaved}>
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
                  <label className={`rpbi-save ${isSaved ? "rpbi-saved" : ""}`}>
                    {recipe.saved}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="rmcrl-right">
            <div className="rmcrlr-ingins">
              <div className="rmcrlri-instructions">
                <h1>Instructions:</h1>
                <ol>
                  {recipe.instructions.map((istruzione, index) => (
                    <li className="rmcrlri-instruction" key={index}>
                      {istruzione}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rmcrlri-ingredients">
                <h1>Ingredients:</h1>
                <ul>
                  {recipe.ingredients.map((ingrediente, index) => (
                    <li className="rmcrlrii-ingredient" key={index}>
                      {ingrediente}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rmcrlr-infos">
              <div className="rmcrlri-info">
                <h1>Prep. Time:</h1>
                <label>{ConvertiMinuti(recipe.prepTime)}</label>
              </div>
              <div className="rmcrlri-info">
                <h1>Cook Time:</h1>
                <label>{ConvertiMinuti(recipe.cookTime)}</label>
              </div>
              <div className="rmcrlri-info">
                <h1>Chill Time:</h1>
                <label>{ConvertiMinuti(recipe.chillTime)}</label>
              </div>
              <div className="rmcrlri-info">
                <h1>Tot. Time:</h1>
                <label>
                  {ConvertiMinuti(
                    recipe.prepTime + recipe.cookTime + recipe.chillTime
                  )}
                </label>
              </div>
              <div className="rmcrlri-info">
                <h1>Healthy:</h1>
                <label>{recipe.healthy}</label>
              </div>
              <div className="rmcrlri-info">
                <h1>Price:</h1>
                <label>{recipe.price + " $"}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="rmcr-right">
          <div className="rmcrr-authorinfo">
            <Link to="/" className="rmcrr-img">
              <img src="\assets\images\recipe\profile_icon.png"></img>
            </Link>
            <Link to="/profile" className="rmcrr-info">
              <h1>{recipeOwner}</h1>
              <label>{recipe.date}</label>
            </Link>
          </div>
          <div className="rmcrr-comments">
            {recipe.comments.map((comment, cIndex) => (
              <div className="rmwrc-container" key={cIndex}>
                <div className="rmwrcc-comment">
                  <div className="rmwrccc-container">
                    <Link to="/profile" className="rmwrcccc-img">
                      <img
                        src="\assets\images\recipecard\profile_icon.png"
                        alt=""
                      />
                    </Link>
                    <div className="rmwrcccc-content">
                      <Link to="/profile" className="rmwrccccc-username">
                        <span>{comment.commentowner}</span>
                      </Link>
                      <p className="rmwrccccc-text">{comment.content}</p>
                    </div>
                  </div>
                </div>
                <div className="rmwrcc-replies">
                  {comment.replies.map((reply, rIndex) => (
                    <div className="rmwrccr-container" key={rIndex}>
                      <div className="rmwrccrc-line">
                        <div></div>
                      </div>
                      <Link to="/profile" className="rmwrccrcl-img">
                        <img
                          src="\assets\images\recipecard\profile_icon.png"
                          alt=""
                        />
                      </Link>
                      <div className="rmwrccr-content">
                        <Link to="/profile" className="rmwrccrc-username">
                          <span>{reply.replyowner}</span>
                        </Link>
                        <Link
                          to="/profile"
                          className="rmwrccrc-usernamereplying"
                        >
                          <span>@{comment.commentowner}</span>
                        </Link>
                        <p className="rmwrccrc-text">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

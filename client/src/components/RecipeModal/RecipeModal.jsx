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
    const qasN = PAGE_SIZE * (qasIndex + 1);
    const newArray1 = [];
    for (let i = 0; i < qas.length; i++) {
      if (i < qasN) newArray1.push(qas[i]);
    }
    const reviewsN = PAGE_SIZE * (reviewsIndex + 1);
    const newArray2 = [];
    for (let i = 0; i < reviews.length; i++) {
      if (i < reviewsN) newArray2.push(reviews[i]);
    }
    setQasVisibleData(newArray1);
    setReviewsVisibleData(newArray2);
  }, [qasIndex, reviewsIndex]);

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
        <div className="recipefull-container">
          <h1 className="recipefull-title">{recipe.title}</h1>
          <div className="recipefull-starsreviewsauthor">
            <div className="recipefull-stars">
              <Rating
                size={25}
                onClick={handleRating}
                initialValue={rating}
                allowFraction={true}
              />
              <label>{Math.floor(recipe.ratingVote * 10) / 10}</label>
              <label>{`(${recipe.totalRatings})`}</label>
            </div>
            <div className="recipefull-divider"></div>
            <div className="recipefull-totalReviews">
              <label>{/* {recipe.totalReviews} */} 114 Reviews</label>
            </div>
            <div className="recipefull-divider"></div>
            <div className="recipefull-authordate">
              <div className="recipefull-author">
                <img src="\assets\images\recipe\profile_icon.png"></img>
                <Link to="/" className="recipefull-authorname">
                  <label>C-Gian{/* {recipe.owner.name} */}</label>
                </Link>
              </div>
              {/* <div className="recipefull-divider"></div>
          <label>{recipe.date}</label> */}
            </div>
            <div className="recipefull-divider"></div>
            <button className="recipefull-save">
              <img
                src="\assets\images\recipe\heart_empty_icon.png"
                alt="save recipe"
              ></img>
              Save
            </button>
          </div>
          <p className="recipefull-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
            {/* {recipe.description} */}
          </p>
          <img
            className="recipefull-img-main"
            src={recipe.imageUrl}
            alt={recipe.title}
          ></img>
          <div className="recipefull-infos-container">
            <div className="recipefull-info-container">
              <h1>Prep. Time:</h1>
              <label>{ConvertiMinuti(recipe.prepTime)}</label>
            </div>
            <div className="recipefull-info-container">
              <h1>Cook Time:</h1>
              <label>{ConvertiMinuti(recipe.cookTime)}</label>
            </div>
            <div className="recipefull-info-container">
              <h1>Chill Time:</h1>
              <label>{ConvertiMinuti(recipe.chillTime)}</label>
            </div>
            <div className="recipefull-info-container">
              <h1>Tot. Time:</h1>
              <label>
                {ConvertiMinuti(
                  recipe.prepTime + recipe.cookTime + recipe.chillTime
                )}
              </label>
            </div>
            <div className="recipefull-info-container">
              <h1>Healthy:</h1>
              <label>{recipe.healthy}</label>
            </div>
            <div className="recipefull-info-container">
              <h1>Price:</h1>
              <label>{recipe.price + " $"}</label>
            </div>
          </div>
          <div className="recipefull-insing-container">
            <div className="recipefull-instructions">
              <h1>Instructions:</h1>
              <ol>
                {recipe.instructions.map((istruzione, index) => (
                  <li className="recipefullins-li" key={index}>
                    {istruzione}{" "}
                  </li>
                ))}
              </ol>
            </div>
            <div className="recipefull-ingredients">
              <h1>Ingredients:</h1>
              <ul>
                {recipe.ingredients.map((ingrediente, index) => (
                  <li className="recipefulling-li" key={index}>
                    {ingrediente}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* <div className="recipefull-qa-container">
          <h1>QUESTIONS</h1>
          <div className="recipefullqa-ask">
            <Link to="/">
              <img src="\assets\images\recipe\profile_icon.png"></img>
            </Link>
            <input type="text" placeholder="Ask a question"></input>
            <button>Submit</button>
          </div>
          <div className="recipefullqa-qrs">
            {qasVisibleData.map((qa, index) => (
              <QandA qa={qa} index={index} key={index}></QandA>
            ))}
            {qasVisibleData.length < qas.length ? (
              <div
                className="recipefull-loadmore"
                onClick={() => setQasIndexndex(qasIndex + 1)}
              >
                <span>Load More Questions</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "18px", height: "18px" }} // Imposta la dimensione desiderata
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0038 18.7296C12.2034 18.7359 12.405 18.6628 12.5573 18.5105L23.7869 7.28085C24.0797 6.98808 24.0797 6.51344 23.7869 6.22071C23.4942 5.92799 23.0196 5.92799 22.7268 6.22071L12.0038 16.9437L1.27963 6.21954C0.986911 5.92682 0.512266 5.92682 0.219543 6.21954C-0.0731809 6.51227 -0.0731809 6.98691 0.219543 7.27963L11.4504 18.5105C11.6027 18.6628 11.8043 18.7359 12.0038 18.7296Z"
                    fill="currentColor"
                    strokeWidth="1" // Imposta la larghezza del tratto
                    stroke="currentColor" // Assicura che il tratto abbia lo stesso colore del riempimento
                  ></path>
                </svg>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="recipefull-s-divider"></div>
        
        <div className="recipefull-related-container">
          <h1>YOU'LL ALSO LOVE</h1>
          <div className="recipefull-relateds">
            {relatedRecipes.slice(0, 3).map((relRecipe, index) => (
              <RecipeCard
                recipe={relRecipe}
                index={index}
                size={{ w: 250, h: 120 }}
              ></RecipeCard>
            ))}
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

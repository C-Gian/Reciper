import React, { useEffect, useRef, useState } from "react";
import "./Recipe.css";
import { Link, useLocation } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { QandA } from "../../components/QandA/QandA";
import axios from "axios";

export const Recipe = () => {
  let { state } = useLocation();
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
  const [rating, setRating] = useState(state.ratingVote);

  const PAGE_SIZE = 3; // or whatever you like
  const [index, setIndex] = useState(0);
  const [visibleData, setVisibleData] = useState([]);
  useEffect(() => {
    const numberOfItems = PAGE_SIZE * (index + 1);
    const newArray = [];
    for (let i = 0; i < qas.length; i++) {
      if (i < numberOfItems) newArray.push(qas[i]);
    }
    setVisibleData(newArray);
  }, [index]);

  const updateReview = async (recipeID, vote) => {
    try {
      // Invia una richiesta PUT al server per aggiornare la ricetta
      const response = await axios.put("http://localhost:3001/recipe/update", {
        newReviewVote:
          (state.ratingVote * state.totalRatings + vote) /
          (state.totalRatings + 1),
        newTotalReviews: state.totalRatings + 1,
        recipeID: recipeID,
      });
      console.log("Aggiornato con successo", response);
    } catch (error) {
      console.error("Errore durante l aggiornamento della valutazione:", error);
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
    updateReview(state._id, rate);
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
    <div className="recipefull-container">
      <h1 className="recipefull-title">{state.title}</h1>
      <div className="recipefull-starsreviewsauthor">
        <div className="recipefull-stars">
          <Rating
            size={25}
            onClick={handleRating}
            initialValue={rating}
            allowFraction={true}
          />
          <label>{Math.floor(state.ratingVote * 10) / 10}</label>
          <label>{`(${state.totalRatings})`}</label>
        </div>
        <div className="recipefull-divider"></div>
        <div className="recipefull-totalReviews">
          <label>{/* {state.totalReviews} */} 114 Reviews</label>
        </div>
        <div className="recipefull-divider"></div>
        <div className="recipefull-authordate">
          <div className="recipefull-author">
            <img src="\assets\images\recipe\profile_icon.png"></img>
            <Link to="/" className="recipefull-authorname">
              <label>C-Gian{/* {state.owner.name} */}</label>
            </Link>
          </div>
          {/* <div className="recipefull-divider"></div>
          <label>{state.date}</label> */}
        </div>
      </div>
      <p className="recipefull-description">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.{/* {state.description} */}
      </p>
      <div className="recipefull-images">
        <img
          className="recipefull-img-main"
          src={state.imageUrl}
          alt={state.title}
        ></img>
        <div className="recipefull-img-sec-container">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="recipefull-infos-container">
        <div className="recipefull-info-container">
          <h1>Prep. Time:</h1>
          <label>{ConvertiMinuti(state.prepTime)}</label>
        </div>
        <div className="recipefull-info-container">
          <h1>Cook Time:</h1>
          <label>{ConvertiMinuti(state.cookTime)}</label>
        </div>
        <div className="recipefull-info-container">
          <h1>Chill Time:</h1>
          <label>{ConvertiMinuti(state.chillTime)}</label>
        </div>
        <div className="recipefull-info-container">
          <h1>Tot. Time:</h1>
          <label>
            {ConvertiMinuti(state.prepTime + state.cookTime + state.chillTime)}
          </label>
        </div>
        <div className="recipefull-info-container">
          <h1>Healthy:</h1>
          <label>{state.healthy}</label>
        </div>
        <div className="recipefull-info-container">
          <h1>Price:</h1>
          <label>{state.price + " $"}</label>
        </div>
      </div>
      <div className="recipefull-insing-container">
        <div className="recipefull-instructions">
          <h1>Instructions:</h1>
          <ol>
            {state.instructions.map((istruzione, index) => (
              <li className="recipefullins-li" key={index}>
                {istruzione}{" "}
              </li>
            ))}
          </ol>
        </div>
        <div className="recipefull-ingredients">
          <h1>Ingredients:</h1>
          <ul>
            {state.ingredients.map((ingrediente, index) => (
              <li className="recipefulling-li" key={index}>
                {ingrediente}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="recipefull-qa-container">
        <h1>QUESTIONS</h1>
        <div className="recipefullqa-ask">
          <Link to="/">
            <img src="\assets\images\recipe\profile_icon.png"></img>
          </Link>
          <input type="text" placeholder="Ask a question"></input>
          <button>Submit</button>
        </div>
        <div className="recipefullqa-qrs">
          {visibleData.map((qa, index) => (
            <QandA qa={qa} key={index}></QandA>
          ))}
          {visibleData.length < qas.length ? (
            <div
              className="recipefullqa-loadmore"
              onClick={() => setIndex(index + 1)}
            >
              <span>Load More Questions</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0038 18.7296C12.2034 18.7359 12.405 18.6628 12.5573 18.5105L23.7869 7.28085C24.0797 6.98808 24.0797 6.51344 23.7869 6.22071C23.4942 5.92799 23.0196 5.92799 22.7268 6.22071L12.0038 16.9437L1.27963 6.21954C0.986911 5.92682 0.512266 5.92682 0.219543 6.21954C-0.0731809 6.51227 -0.0731809 6.98691 0.219543 7.27963L11.4504 18.5105C11.6027 18.6628 11.8043 18.7359 12.0038 18.7296Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="recipefull-reviews-container">
        <h1>REVIEWS</h1>
        <div></div>
      </div>
      <div
        style={{
          height: 500,
          width: "100%",
          backgroundColor: "red",
          marginBottom: 500,
          marginTop: 21900,
        }}
      ></div>
    </div>
  );
};

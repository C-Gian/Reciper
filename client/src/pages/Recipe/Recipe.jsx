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
  const [rating, setRating] = useState(state.ratingVote);

  const PAGE_SIZE = 3; // or whatever you like
  const [qasIndex, setQasIndexndex] = useState(0);
  const [reviewsIndex, setReviewsIndex] = useState(0);
  const [qasVisibleData, setQasVisibleData] = useState([]);
  const [reviewsVisibleData, setReviewsVisibleData] = useState([]);
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
          {qasVisibleData.map((qa, index) => (
            <QandA qa={qa} index={index} key={index}></QandA>
          ))}
          {qasVisibleData.length < qas.length ? (
            <div
              className="recipefullqa-loadmore"
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
      <div className="recipefull-reviews-container">
        <div className="recipefull-reviews-add">
          <h1>REVIEWS</h1>
          <button
            className="recipefull-reviews-add-button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="write-a-review"
          >
            <svg
              width="16"
              height="12"
              viewBox="0 0 27 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.964223 4.23141H14.4614C14.994 4.23141 15.4256 4.66303 15.4256 5.19551C15.4256 5.72806 14.994 6.15961 14.4614 6.15961H0.964223C0.431737 6.15961 0 5.72794 0 5.19551C0 4.66291 0.431677 4.23141 0.964223 4.23141ZM0.964042 8.08782H10.6052C11.1377 8.08782 11.5692 8.51944 11.5692 9.05192C11.5692 9.58447 11.1376 10.016 10.6052 10.016H0.964042C0.431556 10.016 0 9.58435 0 9.05192C0 8.51932 0.431617 8.08782 0.964042 8.08782ZM0.964163 11.9442H6.74866C7.28163 11.9442 7.71282 12.3758 7.71282 12.9083C7.71282 13.4409 7.28114 13.8724 6.74866 13.8724H0.964163C0.431195 13.8724 0 13.4408 0 12.9083C0 12.3757 0.431677 11.9442 0.964163 11.9442ZM0.964103 15.8006H4.21801C4.75025 15.8006 5.18205 16.2323 5.18205 16.7647C5.18205 17.2973 4.75043 17.7288 4.21801 17.7288H0.964103C0.431797 17.7288 0 17.2972 0 16.7647C0 16.2321 0.431617 15.8006 0.964103 15.8006ZM4.82063 0.375H18.3178C18.8504 0.375 19.2821 0.806617 19.2821 1.3391C19.2821 1.87165 18.8504 2.3032 18.3178 2.3032H4.82063C4.28815 2.3032 3.85641 1.87153 3.85641 1.3391C3.85641 0.806496 4.28809 0.375 4.82063 0.375ZM19.9874 7.56558L10.3088 17.2121L9.88205 19.414L12.0625 18.9645L21.7405 9.31862L19.9874 7.56558ZM21.3531 6.20439L23.1062 7.95743L24.6071 6.46138C24.7302 6.33876 24.7926 6.18908 24.7926 6.01657C24.7926 5.84405 24.7303 5.69462 24.6076 5.5723L23.7526 4.72003C23.6296 4.59747 23.4723 4.53269 23.2975 4.53269C23.1227 4.53269 22.9653 4.59747 22.8422 4.72021L21.3531 6.20439ZM8.81569 16.1264C8.85359 16.043 8.90078 15.9546 8.94862 15.8775L9.04708 15.7192L21.7552 3.05322C22.2403 2.5696 22.8854 2.3032 23.5717 2.3032C24.2578 2.3032 24.9027 2.56948 25.3879 3.0531L26.243 3.9053C26.7278 4.3885 26.9949 5.03131 26.9949 5.71522C26.9949 6.39925 26.7276 7.04225 26.2425 7.52581L13.5449 20.1813L13.4043 20.2726C13.3073 20.3357 13.1955 20.3958 13.0894 20.4418L12.9366 20.5082L8.30315 21.4635C7.97711 21.5307 7.76416 21.3204 7.82737 20.9942L8.73748 16.2988L8.81569 16.1264Z"
                fill="currentColor"
              ></path>
            </svg>
            <span>Write A Review</span>
          </button>
        </div>
        {/* <div className="recipefullqa-qrs">
          {reviewsVisibleData.map((qa, index) => (
            <QandA qa={qa} index={index}></QandA>
          ))}
          {reviewsVisibleData.length < qas.length ? (
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
        </div> */}
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

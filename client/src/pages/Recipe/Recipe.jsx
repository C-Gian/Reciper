import React, { useState } from "react";
import "./Recipe.css";
import { Link, useLocation } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

export const Recipe = () => {
  let { state } = useLocation();
  const [rating, setRating] = useState(state.ratingVote);
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

  // Catch Rating value
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
              <label>Gianluca Culaon{/* {state.owner.name} */}</label>
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
          <h1>Tot. Time:</h1>
          <label>
            {ConvertiMinuti(state.prepTime + state.cookTime + state.chillTime)}
          </label>
        </div>
        <div className="recipefull-info-container">
          <h1>Tot. Time:</h1>
          <label>
            {ConvertiMinuti(state.prepTime + state.cookTime + state.chillTime)}
          </label>
        </div>
      </div>
      <div style={{ height: 200 }}></div>
    </div>
  );
};

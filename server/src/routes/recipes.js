import express from "express";
import { UserModel } from "../models/Users.js";
import { RecipeModel } from "../models/Recipes.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.get("/:query", async (req, res) => {
  try {
    const searchTerm = req.params.query;
    const recipes = await RecipeModel.find({
      title: { $regex: searchTerm, $options: "i" },
    });
    res.json(recipes);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.put("/", verifyToken, async (req, res) => {
  const recipe = await RecipeModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/updateReview", verifyToken, async (req, res) => {
  const { newReviewVote, newTotalReviews, recipeID } = req.body;
  try {
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      recipeID,
      { $set: { ratingVote: newReviewVote, totalRatings: newTotalReviews } },
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore nell aggiornamento della ricetta" });
  }
});

router.put("/update-likes", verifyToken, async (req, res) => {
  const { newLikesTotal, recipeID } = req.body;
  try {
    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      recipeID,
      { $set: { likes: newLikesTotal } },
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore nell aggiornamento della ricetta" });
  }
});

/* router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (err) {
    res.json(err);
  }
}); */

export { router as recipesRouter };

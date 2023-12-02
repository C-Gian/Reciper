import mongoose, { mongo } from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: false },
  ingredients: [{ type: String, required: false }],
  instructions: [{ type: String, required: false }],
  description: { type: String, required: false },
  prepTime: { type: Number, required: false },
  cookTime: { type: Number, required: false },
  chillTime: { type: Number, required: false },
  difficulty: { type: String, required: false },
  type: { type: String, required: true },
  date: { type: String, required: true },
  price: { type: Number, required: false },
  totalRatings: { type: Number, required: false },
  ratingVote: { type: Number, required: false },
  healthy: { type: String, required: false },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);

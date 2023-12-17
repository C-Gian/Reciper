import mongoose, { mongo } from "mongoose";

const RecipeSchema = new mongoose.Schema({
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  title: { type: String, required: true, unique: true },
  imageUrl: { type: String, required: false },
  ingredients: [{ type: String, required: false }],
  instructions: [{ type: String, required: false }],
  description: { type: String, required: false },
  prepTime: { type: Number, required: false },
  cookTime: { type: Number, required: false },
  chillTime: { type: Number, required: false },
  date: { type: String, required: true },

  difficulty: { type: String, required: false },
  type: { type: String, required: true },
  healthy: { type: String, required: false },
  price: { type: Number, required: false },

  totalRatings: { type: Number, required: false },
  ratingVote: { type: Number, required: false },
  likes: { type: Number, required: false },
  saved: { type: Number, required: false },
  comments: [
    {
      commentOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      date: { type: Date, default: Date.now },
      content: String,
      replies: [
        {
          replyOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
          date: { type: Date, default: Date.now },
          content: String,
        },
      ],
    },
  ],
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);

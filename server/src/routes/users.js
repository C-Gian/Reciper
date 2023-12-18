import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ msg: "Token is not valid" });
  }
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded.id;
    next();
  } catch (err) {
    console.log(err);
  }
};

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //checking if the username already exists
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username,
    password: hashedPassword,
    likedRecipes: [],
  });
  await newUser.save();

  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //checking if the username exists
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.json({ message: "User doesn't exists" });
  }

  //checking if password match
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secret");

  res.json({ token, userID: user._id });
});

router.put("/edit-liked-recipe", verifyToken, async (req, res) => {
  const { recipeId, toAdd } = req.body;
  try {
    const user = await UserModel.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    if (toAdd) {
      if (!user.likedRecipes.includes(recipeId)) {
        user.likedRecipes.push(recipeId);
        await user.save();
      }
    } else {
      if (user.likedRecipes.includes(recipeId)) {
        user.likedRecipes.pull(recipeId);
        await user.save();
      }
    }
    res.json({ likedRecipes: user.likedRecipes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Errore del server");
  }
});

router.get("/get-liked-recipes", verifyToken, async (req, res) => {
  try {
    console.log(req.user);
    const user = await UserModel.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    res.json({ likedRecipes: user.likedRecipes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Errore del server");
  }
});

export { router as userRouter };

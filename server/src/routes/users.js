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

router.get("/user", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error fetching user" });
  }
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
    res.status(500).send("server error editing liked recipe");
  }
});

router.put("/edit-saved-recipe", verifyToken, async (req, res) => {
  const { recipeId, toAdd } = req.body;
  try {
    const user = await UserModel.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    if (toAdd) {
      if (!user.savedRecipes.includes(recipeId)) {
        user.savedRecipes.push(recipeId);
        await user.save();
      }
    } else {
      if (user.savedRecipes.includes(recipeId)) {
        user.savedRecipes.pull(recipeId);
        await user.save();
      }
    }
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error editing saved recipe");
  }
});

router.get("/get-liked-saved-recipes", verifyToken, async (req, res) => {
  try {
    console.log(req.user);
    const user = await UserModel.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    res.json({
      likedRecipes: user.likedRecipes,
      savedRecipes: user.savedRecipes,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Errore del server");
  }
});

router.get("/recipe-owner/:userID", verifyToken, async (req, res) => {
  const userID = req.params.userID;
  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found while fecthing recipe owner" });
    }
    const username = user.username;
    res.json({ username });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error while fetching recipe owner");
  }
});

export { router as userRouter };

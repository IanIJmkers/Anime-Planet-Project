const express = require('express');
const router = express.Router();
const UserModel = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const {isLoggedOut} = require("../middleware/route-guard")
const upLoader = require("../middleware/cloudinary.config")

// GET route for signup
router.get("/signup", (req, res) => {
  res.render("auth/signup.hbs");
})

// GET route for login
router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login.hbs");
})

// POST Routes for singup
router.post("/signup", async (req, res) => {
  //check if user already exists in the database
  try {
    let response = await UserModel.findOne({username: req.body.username})
    if (!response) {
      //If theres no user with that username, now you create a new one
      //Create a salt
      const salt = bcryptjs.genSaltSync(12);
      const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
      const newUser = await UserModel.create({...req.body, password: hashedPassword,});
      res.redirect("/auth/login");
    } else {
      //send error back to the page
      res.render("auth/signup", {errorMessage: "Username already taken!, try again."});
    } 
  } catch (err) {
    console.error(err);
  }
});

// POST routes for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("SESSION =====> ", req.session)
  const foundUser = await UserModel.findOne({ email: req.body.email });
  //check if there is a user with the email
  //if no user, then show the login page again with a  message
  if (!foundUser) {
    res.render("auth/login", { errorMessage: "Please try again" });
    //else check password to match
  } else {
    const doesPasswordMatch = bcryptjs.compareSync(
      req.body.password,
      foundUser.password
    );
    if (doesPasswordMatch) {
      req.session.currentUser = foundUser
      res.redirect("/profile");
    } else {
      res.render("auth/login", { errorMessage: "Incorrect Details" });
    }
  }
});

//Logout Route
router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.redirect("/auth/signup");
    }
  });
});
module.exports = router;
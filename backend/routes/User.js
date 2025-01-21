const express = require("express");
const { signup, login, checkUsername } = require("../controllers/Auth");

const router = express.Router();


// Route for user signup
router.post("/signup", signup);
router.post("/login", login);
router.post("/checkusername", checkUsername);

module.exports = router;

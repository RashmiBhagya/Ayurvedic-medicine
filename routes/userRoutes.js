const express = require("express");
const { registerUser, authUser, getUserProfile, updateUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authUserMiddleware");
const router = express.Router();

//Routes for Admin Account Operations
router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/view").get(protect, getUserProfile);
router.route("/edit").put(protect, updateUserProfile);

module.exports = router;
const express = require("express");
const {
	registerSeller,
	authSeller,
	getSellerProfile,
	updateSellerProfile,
	deleteSellerProfile,
} = require("../controllers/SellerController");
const { protect } = require("../middleware/authSellerMiddleware");
const router = express.Router();

// user management routes
router.route("/register").post(registerSeller);
router.route("/login").post(authSeller);
router.route("/view").get(protect, getSellerProfile);
router.route("/edit").put(protect, updateSellerProfile);
router.route("/delete").delete(protect, deleteSellerProfile);

module.exports = router;
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const {} = require("../routes/userRoutes");
const {} = require("../routes/customerRoutes");
const {} = require("../routes/sellerRoutes");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
	const { name, dob,nic, telephone, address, email, password, pic,role } = req.body;

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User Profile Exists !");
	}

	const user = new User({
		name,
		dob,
		nic,
		telephone,
		address,
		email,
		password,
		pic,
		role
	});

	const salt = await bcrypt.genSalt(10);

	user.password = await bcrypt.hash(password, salt);

	await user.save();

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			dob: user.dob,
			nic:user.nic,
			telephone: user.telephone,
			address: user.address,
			email:user.email,
			pic: user.pic,
			role:user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("User Registration Failed !");
	}
});

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		res.status(400);
		throw new Error("Invalid email or Password");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		res.status(400);
		throw new Error("Invalid email or Password");
	} else {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			dob: user.dob,
			nic:user.nic,
			telephone: user.telephone,
			address: user.address,
			email: user.email,
			password:user.password,
			pic: user.pic,
			role:user.role,
			token: generateToken(user._id),
		});
	}
});

const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.status(201).json(user);
	} else {
		res.status(400);
		throw new Error("User Not Found !");
	}
});

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.dob = req.body.dob || user.dob;
		user.nic = req.body.nic || user.nic;
		user.telephone = req.body.telephone || user.telephone;
		user.address = req.body.address || user.address;
		user.email = req.body.email || user.email;
		user.pic = req.body.pic || user.pic;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			dob: updatedUser.dob,
			nic: updateUser.nic,
			telephone: updatedUser.telephone,
			address: updatedUser.address,
			email: updatedUser.email,
			pic: updatedUser.pic,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error("Admin Not Found !");
	}
});

module.exports = { registerUser, authUser, getUserProfile, updateUserProfile };

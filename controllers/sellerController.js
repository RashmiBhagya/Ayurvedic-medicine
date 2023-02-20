/**
 * This controller is implemented for
 * the seller user management
 */
const asyncHandler = require("express-async-handler");
const Seller = require("../models/sellerModel");
const {} = require("../routes/sellerRoutes");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

/**
 * This method is implemented to
 * register a new seller to the system
 */
const registerSeller = asyncHandler(async (req, res) => {
	const {
		sellerId,
		ownerName,
		dob,
		nic,
		gender,
		telephone,
		companyName,
		companyAddress,
		email,
		password,
		pic,
		suppliyingMaterials,
	} = req.body;

	const sellerExists = await Seller.findOne({ nic });
	if (sellerExists) {
		res.status(400);
		throw new Error("Seller Profile Exists !");
	}

	const seller = new Seller({
		sellerId,
		ownerName,
		dob,
		nic,
		gender,
		telephone,
		companyName,
		companyAddress,
		email,
		password,
		pic,
		suppliyingMaterials,
	});

	const salt = await bcrypt.genSalt(10);

	seller.password = await bcrypt.hash(password, salt);

	await seller.save();

	if (seller) {
		res.status(201).json({
			_id: seller._id,
			ownerName: seller.ownerName,
			dob: seller.dob,
			nic: seller.nic,
			gender: seller.gender,
			telephone: seller.telephone,
			companyName: seller.companyName,
			companyAddress: seller.companyAddress,
			email: seller.email,
			pic: seller.pic,
			suppliyingMaterials: seller.suppliyingMaterials,
			token: generateToken(seller._id),
		});
	} else {
		res.status(400);
		throw new Error("Seller Registration Failed !");
	}
});

/**
 * This method is implemented to
 * login a seller
 */
const authSeller = asyncHandler(async (req, res) => {
	const { nic, password } = req.body;

	const seller = await Seller.findOne({ nic });

	if (!seller) {
		res.status(400);
		throw new Error("Invalid NIC or Password");
	}

	const isMatch = await bcrypt.compare(password, seller.password);

	if (!isMatch) {
		res.status(400);
		throw new Error("Invalid NIC or Password");
	} else {
		res.status(201).json({
			_id: seller._id,
			sellerId: seller.sellerId,
			ownerName: seller.ownerName,
			dob: seller.dob,
			nic: seller.nic,
			gender: seller.gender,
			telephone: seller.telephone,
			companyName: seller.companyName,
			companyAddress: seller.companyAddress,
			email: seller.email,
			pic: seller.pic,
			suppliyingMaterials: seller.suppliyingMaterials,
			token: generateToken(seller._id),
		});
	}
});

/**
 * This method is implemented to
 * get all seller account details to the admin
 */
const getSellers = asyncHandler(async (req, res) => {
	const seller = await Seller.find();
	res.json(seller);
});

/**
 * This method is implemented to
 * view own seller account by the seller
 */
const getSellerProfile = asyncHandler(async (req, res) => {
	const seller = await Seller.findById(req.seller._id);

	if (seller) {
		res.json(seller);
	} else {
		res.status(400);
		throw new Error("Seller not found !");
	}
});

/**
 * This method is implemented to
 * get the seller profile for Seller
 */
const getSellerProfileById = asyncHandler(async (req, res) => {
	const seller = await Seller.findById(req.params._id);

	if (seller) {
		res.json(seller);
	} else {
		res.status(400);
		throw new Error("Seller not found !");
	}
});

/**
 * This method is implemented to
 * update the seller account
 */
const updateSellerProfile = asyncHandler(async (req, res) => {
	const seller = await Seller.findById(req.seller._id);

	if (seller) {
		seller.sellerId = req.body.sellerId || seller.sellerId;
		seller.ownerName = req.body.ownerName || seller.ownerName;
		seller.dob = req.body.dob || seller.dob;
		seller.nic = req.body.nic || seller.nic;
		seller.gender = req.body.gender || seller.gender;
		seller.telephone = req.body.telephone || seller.telephone;
		seller.companyName = req.body.companyName || seller.companyName;
		seller.companyAddress = req.body.companyAddress || seller.companyAddress;
		seller.email = req.body.email || seller.email;
		seller.pic = req.body.pic || seller.pic;
		seller.suppliyingMaterials = req.body.suppliyingMaterials ||seller.suppliyingMaterials;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			seller.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedseller = await seller.save();

		res.json({
			_id: updatedseller._id,
			sellerId: updatedseller.sellerId,
			ownerName: updatedseller.ownerName,
			dob: updatedseller.dob,
			nic: updatedseller.nic,
			gender: updatedseller.gender,
			telephone: updatedseller.telephone,
			companyName: updatedseller.companyName,
			companyAddress: updatedseller.companyAddress,
			email: updatedseller.email,
			pic: updatedseller.pic,
			suppliyingMaterials: updatedseller.suppliyingMaterials,
			token: generateToken(updatedseller._id),
		});
	} else {
		res.status(404);
		throw new Error("Seller Not Found !");
	}
});

/**
 * This method is implemented to
 * update the seller account by id
 */
const updateSellerProfileById = asyncHandler(async (req, res) => {
	const seller = await Seller.findById(req.params._id);

	if (seller) {
		seller.sellerId = req.body.sellerId || seller.sellerId;
		seller.ownerName = req.body.ownerName || seller.ownerName;
		seller.dob = req.body.dob || seller.dob;
		seller.nic = req.body.nic || seller.nic;
		seller.gender = req.body.gender || seller.gender;
		seller.telephone = req.body.telephone || seller.telephone;
		seller.companyName = req.body.companyName || seller.companyName;
		seller.companyAddress = req.body.companyAddress || seller.companyAddress;
		seller.email = req.body.email || seller.email;
		seller.pic = req.body.pic || seller.pic;
		seller.suppliyingMaterials = req.body.suppliyingMaterials || seller.suppliyingMaterials;
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			seller.password = await bcrypt.hash(req.body.password, salt);
		}
		const updatedseller = await seller.save();

		res.json({
			_id: updatedseller._id,
			sellerId: updatedseller.sellerId,
			ownerName: updatedseller.ownerName,
			dob: updatedseller.dob,
			nic: updatedseller.nic,
			gender: updatedseller.gender,
			telephone: updatedseller.telephone,
			companyName: updatedseller.companyName,
			companyAddress: updatedseller.companyAddress,
			email: updatedseller.email,
			pic: updatedseller.pic,
			suppliyingMaterials: updatedseller.suppliyingMaterials,
			token: generateToken(updatedseller._id),
		});
	} else {
		res.status(404);
		throw new Error("seller Not Found !");
	}
});

/**
 * This method is implemented to
 * delete a seller account
 */
const deleteSellerProfile = asyncHandler(async (req, res) => {
	const seller = await Seller.findById(req.seller._id);

	if (seller) {
		await seller.remove();
		res.json({ message: "seller Removed !" });
	} else {
		res.status(404);
		throw new Error("seller not Found !");
	}
});

/**
 * This method is implemented to
 * delete a seller account by admin
 */
const deleteSellerProfileById = asyncHandler(async (req, res) => {
	const seller = await Seller.findById(req.params._id);

	if (seller) {
		await seller.remove();
		res.json({ message: "seller Removed !" });
	} else {
		res.status(404);
		throw new Error("seller not Found !");
	}
});

module.exports = {
	registerSeller,
	authSeller,
	getSellers,
	getSellerProfile,
	getSellerProfileById,
	updateSellerProfile,
	updateSellerProfileById,
	deleteSellerProfile,
	deleteSellerProfileById,
};


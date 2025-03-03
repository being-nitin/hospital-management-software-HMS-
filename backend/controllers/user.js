const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken.js");
const User = require("../models/user.js");
const Doctor = require("../models/doctorsDetails.js");
const Patient = require("../models/patientDetails.js");
const Expenses = require("../models/expenses.js");
const VaccineAppointment = require("../models/VaccineAppointment.js");

// @desc    Auth user & get token
// @route   POST /api/users/signin
// @access  Public
exports.authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const user = await User.create({
		name,
		email,
		password,
		role : 0
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: 0,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			role: updatedUser.role,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

exports.deleteUser = asyncHandler(async (req, res) => {
	const { user } = req.params;

	const result = await User.findById(user);

	if (result) {
		await result.remove();
		res.json({ message: "User removed" });
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.role = req.body.role;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			role: updatedUser.role,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res) => {
	// const keyword = req.query.keyword ? {
	//     name: {
	//         $regex: req.query.keyword,
	//         $options: 'i'
	//     }
	// }: {}

	const users = await User.find({});
	//const users = await User.find({...keyword})
	//console.log(users)
	res.json(users);
});

exports.getUserDetails = asyncHandler(async (req, res) => {
	try {
		let query =  {}
		if(req.user.role ===  1){
           query.doctor = req.user._id
		}
		const users = await User.find().select("name email");
		const doctors = await User.find({role : 1});
		const staff = await User.find({ role : 2 })
		const patients = await Patient.find().select("firstName ");
		const expenses = await Expenses.find(query);
		
		const appointmentlength = await VaccineAppointment.find(query).countDocuments();
		
		const appointments = await VaccineAppointment.find(query).sort({ date : -1}).populate('patient').limit(5)

		res.status(200).json({
			users: users,
			doctors: doctors,
			patients: patients,
			staff,
			expenses: expenses,
			totalappointment: appointmentlength,
			appointments
		});
	} catch (error) {
		res.json({
			message: "Server Error",
		});
	}
});

exports.userById = async (req, res, next, id) => {
	await User.findById(id).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		req.user = user;
		next();
	});
};

exports.addPatientToUserHistory = (req, res, next) => {
	//console.log(req.body)

	User.findOneAndUpdate(
		{ _id: req.body.user },
		{ details: req.body },
		{ new: true },
		(error, data) => {
			//console.log(data)
			if (error) {
				return res.status(400).json({
					error: "Could not update user patient details ",
				});
			}
			next();
		}
	);
};

exports.registerUsers = asyncHandler(async (req, res) => {
	const { name, email, password, confirmPassword, role } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	if (password !== confirmPassword) {
		throw new Error("Password1 && Password2 do not match");
	}

	const user = await User.create({
		name,
		email,
		password,
		role,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

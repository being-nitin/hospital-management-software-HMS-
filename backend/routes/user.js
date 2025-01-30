const express = require("express");
const router = express.Router();
const {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
	userById,
	registerUsers,
	getUserDetails,
} = require("../controllers/user.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

router.get("/details", protect, getUserDetails);

router.get("/user/:userId", protect, getUserProfile);

router.get("/users/other/:id/:userId", protect, getUserById);

router.put("/user/update/:userId", protect, updateUserProfile);

router.get("/users/get", protect, getUsers);

router.put("/user/:userId", protect, updateUserProfile);

router.put("/users/update/:id/:userId", protect, updateUser);

router.delete("/users/delete/:user", protect, deleteUser);

router.post("/signup", registerUser);

router.post("/register-users/:userId", protect, registerUsers);

router.post("/signin", authUser);

//router.param("user", getUserById)
router.param("userId", userById);

module.exports = router;

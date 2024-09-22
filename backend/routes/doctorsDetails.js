const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')

const {

} = require( '../controllers/user.js')


const { createDoctorsDetails, getDoctorDetail, update, remove, list, getDaysValues, getGenderValues, getDutyValues} = require('../controllers/doctorsDetails');


const { protect, admin } = require('../middleware/authMiddleware.js')

router.get('/doctor-detail/:id/:userId', protect,  getDoctorDetail);

router.put('/doctor-update/:id/:userId', protect,  update);

router.delete('/doctor-remove/:id', protect,   remove);

router.get('/doctor-list/:userId', protect,  list);

router.post("/doctor-create/:userId", protect,  createDoctorsDetails)

router.get("/doctor/days-values/:userId", protect,  getDaysValues);

router.get("/doctor/gender-values/:userId", protect,  getGenderValues);

router.get("/doctor/duty-values/:userId", protect,  getDutyValues);




router.param('userId', userById);




module.exports = router;
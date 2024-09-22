const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getVaccineApp, createVaccineApp, update, remove, list, getDayValues, getTakenValues  } = require('../controllers/VaccineAppointment');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/vaccine-app-detail/:id', protect, getVaccineApp);


router.put('/vaccine-app-update/:id', protect, update);

router.delete('/vaccine-app-remove/:id/:userId', protect,  remove);

router.get('/vaccine-app-list/:userId', protect, list);


router.post("/vaccine-app-create/:userId", protect, createVaccineApp)

router.get("/vaccine/vaccine-day-values/:userId", protect, getDayValues);

router.get("/vaccine/vaccine-taken-values/:userId", protect, getTakenValues);


router.param('userId', userById);



module.exports = router;
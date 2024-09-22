const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')

const {
    addPatientToUserHistory
} = require( '../controllers/user.js')


const { creatPatientDetails, getPatientDetail, update, remove, list, getStatusValues, getGenderValues, getPatientTypeValues, patientsById, getPatientDetailUser } = require('../controllers/patientDetails');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/patient-detail/:id', protect,  getPatientDetail);

router.get('/patient-detail-user/:id', protect,  getPatientDetailUser);

router.put('/patient-update/:id', protect,  update);

router.delete('/patient-remove/:patient', protect,   remove);

router.get('/patient-list/:userId', protect,  list);



router.post("/patient-create/:userId", protect,  creatPatientDetails)

router.get("/patient/status-values/:userId", protect,  getStatusValues);

router.get("/patient/gender-values/:userId", protect,  getGenderValues);

router.get("/patient/patient-type-values/:userId", protect,  getPatientTypeValues);

//router.get("/patient/patient-photo/:patientsById/:userId", photo);


router.param('userId', userById);

router.param('patientsById', patientsById);


module.exports = router;
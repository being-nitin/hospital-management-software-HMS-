const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')



const { createPrescription, presById, getPrescriptionDetail, update, remove, list, getTakeValues, getPaidValues, getPrescriptionDetailUser  } = require('../controllers/prescription');


const { protect, admin } = require('../middleware/authMiddleware.js')

router.get('/pres-detail/:presId/:userId', protect,  getPrescriptionDetail);

router.get('/pres-detail-user/:id/:userId', protect,  getPrescriptionDetailUser);


router.put('/pres-update/:id/:userId', protect,  update);

router.delete('/pres-remove/:id', protect,   remove);

router.get('/pres-list/:userId', protect,  list);


router.post("/pres-create/:userId", protect,  createPrescription)

router.get("/pres/take-values/:userId", protect,  getTakeValues );

router.get("/pres/paid-values/:userId", protect,  getPaidValues);


router.param('presId', presById);

router.param('userId', userById);

module.exports = router;
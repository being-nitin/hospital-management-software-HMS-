const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getVaccineCat, createVaccineCat, update, remove, list, getTypeValues  } = require('../controllers/vaccineCat');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/vaccine-detail/:id/:userId', protect,  getVaccineCat);


router.put('/vaccine-update/:id/:userId', protect,  update);

router.delete('/vaccine-remove/:id/:userId', protect,   remove);

router.get('/vaccine-list/:userId', protect,  list);


router.post("/vaccine-create/:userId", protect,  createVaccineCat)

router.get("/vaccine/vaccine-type-values/:userId", protect,  getTypeValues);


router.param('userId', userById);



module.exports = router;
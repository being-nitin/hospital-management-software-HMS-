const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getMedicine, createMedicine, update, remove, list, getTypeValues  } = require('../controllers/Medicine');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/medicine-detail/:id/:userId', protect,  getMedicine);


router.put('/medicine-update/:id/:userId', protect,  update);

router.delete('/medicine-remove/:id/:userId', protect,   remove);

router.get('/medicine-list/:userId', protect,  list);


router.post("/medicine-create/:userId", protect,  createMedicine)

router.get("/medicine/medicine-type-values/:userId", protect,  getTypeValues);


router.param('userId', userById);



module.exports = router;
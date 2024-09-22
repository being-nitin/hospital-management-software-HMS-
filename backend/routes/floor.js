const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { createFloor, getFloor, update, remove, list  } = require('../controllers/floor');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/floor-detail/:id/:userId', protect,  getFloor);


router.put('/floor-update/:id/:userId', protect,  update);

router.delete('/floor-remove/:id/:userId', protect,   remove);

router.get('/floor-list/:userId', protect,  list);


router.post("/floor-create/:userId", protect,  createFloor)




router.param('userId', userById);

module.exports = router;
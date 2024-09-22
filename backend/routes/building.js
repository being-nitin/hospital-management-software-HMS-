const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getBuilding, createBuilding, update, remove, list  } = require('../controllers/building');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/building-detail/:id/:userId', protect,  getBuilding);


router.put('/building-update/:id/:userId', protect,  update);

router.delete('/building-remove/:id/:userId', protect,   remove);

router.get('/building-list/:userId', protect,  list);


router.post("/building-create/:userId", protect,  createBuilding)




router.param('userId', userById);

module.exports = router;
const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const {  remove, list  } = require('../controllers/vendors');


const { protect, admin } = require('../middleware/authMiddleware.js')




//router.get('/building-detail/:id/:userId', protect,  getBuilding);


//router.put('/building-update/:id/:userId', protect,  update);

router.delete('/vendor-remove/:id/:userId', protect,   remove);

router.get('/vendor-list/:userId', protect,  list);


//router.post("/building-create/:userId", protect,  createBuilding)




router.param('userId', userById);

module.exports = router;
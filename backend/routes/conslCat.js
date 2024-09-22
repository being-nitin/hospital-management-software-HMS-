const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getCatConslDetail, createConsulCategory, update, remove, list  } = require('../controllers/conslCat');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/consul-detail/:id/:userId', protect,  getCatConslDetail);


router.put('/consul-update/:id/:userId', protect,  update);

router.delete('/consul-remove/:id/:userId', protect,   remove);

router.get('/consul-list/:userId', protect,  list);


router.post("/consul-create/:userId", protect,  createConsulCategory)




router.param('userId', userById);



module.exports = router;
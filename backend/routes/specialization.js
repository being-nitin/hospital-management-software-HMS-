const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getSpecialize, createSpecialize, update, remove, list  } = require('../controllers/specialization');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/specialize-detail/:id/:userId', protect,  getSpecialize);


router.put('/specialize-update/:id/:userId', protect,  update);

router.delete('/specialize-remove/:id/:userId', protect,   remove);

router.get('/specialize-list/:userId', protect,  list);


router.post("/specialize-create/:userId", protect,  createSpecialize)




router.param('userId', userById);

module.exports = router;
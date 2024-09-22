const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { createDepart, getDepart, update, remove, list  } = require('../controllers/department');


const { protect, admin } = require('../middleware/authMiddleware.js')



router.get('/depart-detail/:id/:userId', protect,  getDepart);


router.put('/depart-update/:id/:userId', protect,  update);

router.delete('/depart-remove/:id/:userId', protect,   remove);

router.get('/depart-list/:userId', protect,  list);


router.post("/depart-create/:userId", protect,  createDepart)




router.param('userId', userById);



module.exports = router;
const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getExpenseDetail, creatExpense, update, remove, list, getPaidValues  } = require('../controllers/expenses');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/expenses-detail/:id/:userId', protect,  getExpenseDetail);


router.put('/expenses-update/:id/:userId', protect,  update);

router.delete('/expenses-remove/:id/:userId', protect,   remove);

router.get('/expenses-list/:userId', protect,  list);


router.post("/expenses-create/:userId", protect,  creatExpense)

router.get("/expenses/paid-values/:userId", protect,  getPaidValues);




router.param('userId', userById);


module.exports = router;
const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { createTestCategory, testcategoryById, update, remove, list, getCatTestDetail  } = require('../controllers/testCategoryController');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/test-category-detail/:categoryTestId/:userId', protect,  getCatTestDetail);

router.put('/test-category-update/:id', protect,  update);

router.delete('/test-category/:category', protect,   remove);

router.get('/test-categories/:userId', list);


router.post("/test-category/create/:userId", protect,  createTestCategory)


router.param('categoryTestId', testcategoryById);

router.param('userId', userById);

module.exports = router;








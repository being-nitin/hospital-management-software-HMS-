const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { createTest, testById, getTestDetail, update, remove, list, getPaidValues , getTestDetailUser } = require('../controllers/test');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/test-detail/:testId/:userId', protect,  getTestDetail);


router.get('/test-detail-user/:id/:userId', protect,  getTestDetailUser);

router.put('/test-update/:testId', protect,  update);

router.delete('/test-remove/:test', protect,   remove);

router.get('/test-list/:userId', protect,  list);


router.post("/test-create/:userId", protect,  createTest)

router.get("/test/paid-values/:userId", protect,  getPaidValues);

router.param('testId', testById);

router.param('userId', userById);

module.exports = router;
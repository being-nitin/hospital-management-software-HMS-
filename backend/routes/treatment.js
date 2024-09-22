const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { createTreatmentCategory,
    treatmentCatById,
    update,
    remove,
    list,
    getCatTreatmentDetail  } = require('../controllers/treatment');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/treatment-cat-detail/:id/:userId', protect,  getCatTreatmentDetail);

router.put('/treatment-cat-update/:id', protect,  update);

router.delete('/treatment-cat/:category', protect,   remove);

router.get('/treatment-cat-list/:userId', protect,  list);


router.post("/treatment-cat/create/:userId", protect,  createTreatmentCategory)


router.param('treatmentId', treatmentCatById);

router.param('userId', userById);

module.exports = router;
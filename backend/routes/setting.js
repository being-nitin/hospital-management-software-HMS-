const express = require('express');
const { create } = require('../controllers/setting');
const router = express.Router();

router.post('/' , create)


module.exports = router
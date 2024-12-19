const express = require('express');
const { create, update, get } = require('../controllers/setting');

const multiUpload = require('../utils/multer');
const router = express.Router();

router.post('/' , create)
router.put('/' , multiUpload.fields([
    { 
        name: 'header', 
        maxCount: 1 
      }, 
      { 
        name: 'footer', 
        maxCount: 1 
      }
]), update)

router.get('/' , get)

module.exports = router
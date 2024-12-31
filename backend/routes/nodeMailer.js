const express = require("express");
const { sendGmail } = require("../controllers/nodeMailer");

const router = express.Router();

router.post("/sendmail", sendGmail);

module.exports = router;

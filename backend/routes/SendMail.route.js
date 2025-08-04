const express = require("express");
const router = express.Router();
const controller = require("../controllers/SendMail.controller");

router.post("/sendmail", controller.SendMailToBoth);

module.exports = router;

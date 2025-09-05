const express = require('express');

const{addRate, getRates, getLatestRate} = require("../controllers/Metalratecontroller");

const router = express.Router();
router.post("/", addRate);
router.get("/",getRates);
router.get("/",getLatestRate);

module.exports = router;
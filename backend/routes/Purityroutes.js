const express = require('express');
const router = express.Router();

const{createPurity, getPurities, updatePurity, deletePurity} = require('../controllers/Puritycontroller');

router.post("/", createPurity);
router.get("/", getPurities);
router.put("/", updatePurity);
router.delete("/", deletePurity);

module.exports = router;

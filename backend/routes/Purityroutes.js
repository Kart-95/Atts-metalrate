const express = require('express');
const router = express.Router();

const{createPurity, getPurities, updatePurity, deletePurity, getPurityById} = require('../controllers/Puritycontroller');

router.post("/", createPurity);
router.get("/", getPurities);
router.get("/:id", getPurityById);
router.put("/", updatePurity);
router.delete("/", deletePurity);

module.exports = router;

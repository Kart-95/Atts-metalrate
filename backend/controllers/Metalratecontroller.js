const Rate = require("../models/Rate");


const addRate = async (req, res) => {
  try {
    const { metal, purity, rate, date } = req.body;

    if (!metal || !purity || !rate || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRate = new Rate({ metal, purity, rate, date });
    await newRate.save();

    res.status(201).json(newRate);
  } catch (err) {
    console.error("Error adding rate:", err.message);
    res.status(500).json({ error: "Failed to add rate" });
  }
};


const getRates = async (req, res) => {
  try {
    const rates = await Rate.find().sort({ date: -1 });
    res.json(rates);
  } catch (err) {
    console.error("Error fetching rates:", err.message);
    res.status(500).json({ error: "Failed to fetch rates" });
  }
};


const getLatestRate = async (req, res) => {
  try {
    const { metal, purity } = req.query;

    const filter = {};
    if (metal) filter.metal = metal;
    if (purity) filter.purity = purity;

    const latestRate = await Rate.findOne(filter).sort({ date: -1 });

    if (!latestRate) {
      return res.status(404).json({ message: "No rate found" });
    }

    res.json(latestRate);
  } catch (err) {
    console.error("Error fetching latest rate:", err.message);
    res.status(500).json({ error: "Failed to fetch latest rate" });
  }
};

module.exports = {
  addRate,
  getRates,
  getLatestRate,
};

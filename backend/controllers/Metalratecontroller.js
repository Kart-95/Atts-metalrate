const MetalRate = require("../models/Metalrate");
const Purity = require("../models/Purity");

const addRate = async(req,res)=>{
    try{
        const {metal, purity, rate, date} = req.body;
        if(!metal || !purity || !rate || !date) {
            return res.status(400).json("All field are required");
        }

        const purityExists = await Purity.findById(purity);
        if (!purityExists){
            return res.status(404).json("Purity not found");
        }

        const newRate = await MetalRate.create({metal, purity, rate, date});
        res.status(201).json(newRate);
    }catch(error){
        res.status(500).json(error.message)
    }
};

const getRates = async(req,res)=>{
    try{
        const {metal, purity, page = 1, limit = 10} = req.query;
        const query = {};

        if (metal) query.metal = metal;
        if (purity) query.purity = purity;

        const rates = await MetalRate.find(query)
        .populate("purity")
        .sort({date: -1})
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

        const total = await MetalRate.countDocuments(query);

        res.json({total, page:parseInt(page), limit:parseInt(limit), rates});
    }catch(error){
        res.status(500).json(error.message);
    }
};

const getLatestRate = async(req,res)=>{
    try{
        const {metal, purity} = req.query;

        if(!metal || !purity){
            return res.status(400).json("metal and purity are required")
        }

        const latestRate = await MetalRate.findOne({metal, purity})
        .sort({date:-1})
        .populate("purity");

        if(!latestRate){
            return res.status(404).json("No rate found");
        }

        res.json(latestRate);
    }catch(error){
        res.status(500).json(error.message)
    }
};

module.exports = {addRate, getRates, getLatestRate};
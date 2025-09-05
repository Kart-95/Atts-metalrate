const Purity = require("../models/Purity");

const createPurity = async(req,res) =>{
    try{
        const {metal,name} = req.body;

        if (!metal || !name){
            return res.status(400).json("metal and name fields are required")
        }
    const purity = await Purity.create({metal, name});
    res.status(201).json(purity);
    } catch(error){
        res.status(500).json(error.message)
    }
};

const getPurities = async(req,res)=>{
    try{
        const purities = await Purity.find().sort({createdAt:-1});
        res.json(purities);
    }catch(error){
        res.status(500).json(error.message);
    }
};

const updatePurity = async(req,res)=>{
    try{
        const {id} = req.params;
        const purity = await Purity.findByIdAndUpdate(id, req.body, {new:true});

        if (!purity){
            return res.status(404).json("purity not found")
        }

        res.json(purity);
    }catch(error){
        res.status(500).json(error.message)
    }
};

const deletePurity = async(req,res)=>{
    try{
        const {id} = req.params;
        const purity = await Purity.findByIdAndDelete(id);
        
        if (!purity){
            return res.status(404).json("purity not found")
        }

        res.json("Purity deleted successfully");
    }catch(error){
        res.status(500).json(error.message)
    }
};

module.exports = {createPurity, getPurities, updatePurity, deletePurity};


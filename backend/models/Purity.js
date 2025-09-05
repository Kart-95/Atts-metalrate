const mongoose = require('mongoose');

const PuritySchema = new mongoose.Schema({
    metal: {type: String, enum:["Gold","Silver","Platinum"], required: true},
    name: {type: String, required: true, trim: true},
},{timestamps: true});

module.exports = mongoose.model("Purity", PuritySchema);

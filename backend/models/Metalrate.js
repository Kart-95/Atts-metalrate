const mongoose = require('mongoose');

const MetalSchema = new mongoose.Schema({
    metal: {type: String, enum:["Gold","Silver","Platinum"], required: true},
    purity: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Purity"},
    rate: {type: String, required: true},
    date: {type: Date, required: true}
},{timestamps: true});


module.exports = mongoose.model("Metalrate", MetalSchema);
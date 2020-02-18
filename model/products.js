var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// creating schema for products
var productSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    price: {
        type: Number
    },
    categorieId: {
        type: Schema.Types.ObjectId,
        ref: "Categorie",
        required: true
    }
},
{ timestamps: true }
);

// creating model
var Product = mongoose.model("Product", productSchema);
module.exports = Product;
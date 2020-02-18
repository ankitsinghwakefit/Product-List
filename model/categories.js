var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// creating schema for product categories
var categorieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
},
{ timestamps: true }
);

// creating model
var Categorie = mongoose.model("Categorie",categorieSchema);
module.exports = Categorie;
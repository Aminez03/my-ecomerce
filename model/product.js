let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let productSchema = Schema({
  title: String,
  price: Number,
  description:String,
  category: String,
  image: String,
  promo:Number,
  
});
module.exports=mongoose.model("Product",productSchema)
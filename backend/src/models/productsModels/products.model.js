
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter product name"],
  },
  description: {
    type: String,
    required: [true, "Enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Enter product price"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      img: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: [true, "Enter category"],
  },
  stock:{
    type:Number,
    required:true,
    default:1
  },
  numofReviews:{
    type:Number,
    default:0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      },
      name: {
        type: String
        // required: true,
      },
      rating: {
        type: Number
        // required: true,
      },
      comment: {
        type: String
        // required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
});

module.exports= mongoose.model("Products", productsSchema);
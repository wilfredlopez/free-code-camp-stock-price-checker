const mongoose = require("mongoose");

const StockPriceSchema = new mongoose.Schema(
  {
    stock: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    ipsLiked: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const StockPrice = mongoose.model("StockPrice", StockPriceSchema);

module.exports = StockPrice;

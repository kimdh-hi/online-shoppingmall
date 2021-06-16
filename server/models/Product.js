const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    // 현재 로그인된 사용자의 ID
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    },
    countries: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// 검색 키워드
productSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      // 검색 가중치
      title: 5, // 중요
      description: 1, // 덜 중요
    },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

// for image file (multer)
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/images", (req, res) => {
  upload(req, res, err => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

// 업로드 데이터 DB에 저장
router.post("/", (req, res) => {
  const product = new Product(req.body);

  product.save(err => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});

router.post("/products", (req, res) => {
  let skip = req.body.skip ? parseInt(req.body.limit) : 0;
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;

  let filterIndex = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      console.log("key", key);
      if (key === "price") {
        filterIndex[key] = {
          // gte (mongoDB): grater-than-equals
          $gte: req.body.filters[key][0],
          // lte (mongoDB) : less-than-equals
          $lte: req.body.filters[key][1],
        };
      } else {
        filterIndex[key] = req.body.filters[key];
      }
    }
  }

  console.log("value", filterIndex);

  Product.find(filterIndex)
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, products, productsLength: products.length });
    });
});

module.exports = router;

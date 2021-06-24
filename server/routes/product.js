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
  let searchCondition = req.body.searchTerm;

  let filterIndex = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
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

  if (searchCondition) {
    Product.find(filterIndex)
      .find({ $text: { $search: searchCondition } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, products, productsLength: products.length });
      });
  } else {
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
  }
});

router.get("/detail", (req, res) => {
  let productId = req.query.id;
  let type = req.query.type;

  Product.find({ _id: productId })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, product });
    });
});

// 장바구니 데이터 가져오기
// type = array
router.get("/products_by_id", (req, res) => {
  let productIds = req.query.id;
  let type = req.query.type;

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = ids.map(item => {
      return item;
    });
  }

  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).send(product);
    });
});

module.exports = router;

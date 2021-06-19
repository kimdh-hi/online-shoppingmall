const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post("/cart", auth, (req, res) => {
  // auth미들웨어에서  req에 user정보를 넣어주었기 때문에 사용 가능
  // 유저 정보
  User.findOne({ _id: req.user._id }),
    (err,
    userInfo => {
      let isNewItem = true;
      userInfo.cart.foreach(item => {
        if (item.id === req.body.productId) {
          isNewItem = false;
        }
      });

      if (!isNewItem) {
        User.findOneAndUpdate(
          { _id: req.user._id, "cart.id": req.body.productId },
          { $inc: { "cart.$.quantity": 1 } },
          { new: true }, // update된 결과를 반환받기 위함
          (err, userInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).send(userInfo.cart);
          }
        );
      } else {
        User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              cart: {
                id: req.body.productId,
                quantity: 1,
                date: Date.now(),
              },
            },
          },
          { new: true },
          (err, userInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).send(userInfo.cart);
          }
        );
      }
    });
});

module.exports = router;

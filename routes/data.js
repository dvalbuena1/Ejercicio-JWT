var express = require("express");
var router = express.Router();

var middleware = require("../middleware.js");
const Data = require("../models/data");

router.post(
  "/",
  middleware.checkToken,
  middleware.checkAdmin,
  (req, res, next) => {
    Data.create(req.body)
      .then((data) => res.status(200).json({ msg: "Data added", data }))
      .catch((err) =>
        res.status(400).json({ msg: "Some information is not valid", err })
      );
  }
);

router.get(
  "/",
  middleware.checkToken,
  middleware.checkUser,
  (req, res, next) => {
    let query = {};
    if (req.decoded.role !== "admin") {
      query = { role: req.decoded.role };
    }

    Data.find(query, (err, data) => {
      if (err) {
        res.status(400).json({ msg: "Some information is not valid", err });
        return;
      }
      res.status(200).json({ msg: "Success", data });
    });
  }
);

module.exports = router;

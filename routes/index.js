var express = require("express");
var router = express.Router();

var HandlerGenerator = require("../handlegenerator.js");

const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/login", HandlerGenerator.login);

router.post("/signUp", (req, res, next) => {
  let password = req.body.password;
  let salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  User.create({ ...req.body, password })
    .then((user) =>
      res.status(200).json({ msg: "Registered successfully", user })
    )
    .catch((err) =>
      res.status(400).json({ msg: "Some information is not valid", err })
    );
});

module.exports = router;

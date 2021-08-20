const bcrypt = require("bcrypt");
const express = require("express");
const _ = require("lodash");
const { validate, User } = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already  exists");
 
  let user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.status(201).send(_.pick(user, ['_id', 'name', 'email']));;
});

router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("user does not  exist");
  const token = user.generateAuthToken();
  return res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;

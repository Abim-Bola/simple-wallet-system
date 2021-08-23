const bcrypt = require("bcrypt");
const express = require("express");
const _ = require("lodash");
const auth = require('../middleware/auth');
const { PaystackService } = require("../utils/paystack");
const { validate, Wallet } = require("../models/wallet");
const router = express.Router();

//USER CAN CREATE WALLET AND FETCH WALLET DATA


router.post("/", auth, async (req, res) => {
 try {
  const {_id} = req.user;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {accountNumber, bankCode} = req.body;
  const verifyAccount = await PaystackService.verifyAccountNumber({
    accountNumber, 
    bankCode,
  });
  if (verifyAccount && Object.keys(verifyAccount).length <= 0) {
    throw Error('Invalid account information');
  }
  let wallet = new Wallet(_.pick(req.body, ["bankCode", "accountNumber"]));
   wallet.user = _id;
   wallet.accountName = verifyAccount.account_name;
  await wallet.save();

  res.status(201).send(_.pick(wallet, ['_id','user','bankCode','accountName', 'accountNumber', 'balance']));;
 } catch (error) {
  return error;
 }
});

router.get("/", auth, async (req, res) => {
 try {
  const {_id} = req.user
  const wallet = await Wallet.findOne({user: _id})
  res.status(200).send( _.pick(wallet, ['_id','user', 'accountName', 'accountNumber', 'bankCode']));
 } catch (error) {
  return error;
 }
});

module.exports = router;

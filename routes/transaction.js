const express = require("express");
const _ = require("lodash");
const auth = require('../middleware/auth');
const { PaystackService } = require("../utils/paystack");
const { validate, Wallet } = require("../models/wallet");
const { Transaction } = require("../models/transaction");
const router = express.Router();


router.post("/", auth, async (req, res) => {
    const {_id} = req.user;
    const { accountNumber, bankCode, amount, reason, type } = req.body;
    // get my wallet balance and make sure it is > 0
    // 1) Verify account number
    const wallet = await Wallet.findOne({ user: _id });
    const verified = await PaystackService.verifyAccountNumber({
      accountNumber,
      bankCode,
    });
  
    console.log({ verified });
  
    if (verified && Object.keys(verified).length <= 0) {
      throw Error("Invalid account information");
    }
  
    if (wallet.balance < amount) {
      res.send("Insufficient funds");
    }
    // create transfer recipient
    const transferRecipient = await PaystackService.createTransferRecipient({
      account_number: accountNumber,
      bank_code: bankCode,
    });
    console.log({ transferRecipient });

    // 3) Inititate transfer
    const transfer = await PaystackService.transfer({
      reason,
      amount,
      recipient: transferRecipient,
    });
    console.log(transfer)
    const final = await walletTransaction[type]({ amount, walletId: wallet._id });
    console.log("USER BALANCE AFTER DEBIT", final);
    console.log({ transfer });
  });

  router.get("/", auth, async (req, res) => {
    try {
      const {_id} = req.user
      const wallet = await Wallet.findOne({user: _id})
      const transaction = await Transaction.findOne({wallet: wallet._id})
      res.status(200).send( _.pick([transaction, '_id','reference', 'balanceBefore', 'balanceAfter', 'wallet']));
    } catch (error) {
      return error;
    }
   
  });

  module.exports = router;
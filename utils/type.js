const { PaystackService } = require("./paystack");
const { creditWallet, debitWallet } = require("./transactions");

module.exports.transactionType = {
  credit: PaystackService,
  debit: null,
};

module.exports.walletTransaction = {
  credit: creditWallet,
  debit: debitWallet,
};

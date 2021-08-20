const Transaction = require("../models/transaction");
const Wallet = require("../models/wallet");
const { v4: uuidv4 } = require("uuid");

/**
 *
 * @param {string} walletId Wallet id
 * @param {string} amount Amount
 */
async function creditWallet({ ...params }) {
  const { walletId, amount } = params;
  const wallet = await Wallet.findById(walletId);
  const balanceAfter = parseInt(wallet.balance + amount);
  const transaction = await Transaction.create({
    reference: uuidv4(),
    balanceBefore: wallet.balance,
    balanceAfter,
    direction: "credit",
    wallet: wallet._id,
  });
  wallet.balance = balanceAfter;
  await wallet.save();
  return transaction;
}

/**
 * @description A function that handles debit
 * @param {string} walletId Wallet id
 * @param {string} amount Amount
 */
async function debitWallet({ ...params }) {
  const { walletId, amount } = params;
  const wallet = await Wallet.findById(walletId);
  const balanceAfter = parseInt(wallet.balance - amount);
  const transaction = await Transaction.create({
    reference: uuidv4(),
    balanceBefore: wallet.balance,
    balanceAfter,
    direction: "debit",
    wallet: wallet._id,
  });
  wallet.balance = balanceAfter;
  await wallet.save();
  return transaction;
}

module.exports = { creditWallet, debitWallet };

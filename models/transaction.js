const { Schema, model } = require("mongoose");
const transactions = new Schema(
  {
    reference: String,
    balanceBefore: Number,
    balanceAfter: Number,
    direction: {
      type: Schema.Types.String,
      enum: ["debit", "credit"],
      default: null,
    },
    wallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
  },
  { timestamps: true }
);
const Transaction = model("Transaction", transactions);
exports.Transaction = Transaction;
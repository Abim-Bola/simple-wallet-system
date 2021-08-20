const { Schema, model } = require("mongoose");
const Joi = require('joi');
const wallet = new Schema(
  {
    balance: { type: Schema.Types.Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    accountNumber: { type: Schema.Types.String },
    bankCode: { type: Schema.Types.String },
  },
  { timestamps: true }
);
const Wallet = model("Wallet", wallet);

wallet.path("balance").get((num) => +(num * 100).toFixed(2));
wallet.path("balance").set((num) => +(num / 100).toFixed(2));

function validateWallet(wallet){
    const schema = Joi.object({
        accountNumber: Joi.string().required(),
        bankCode: Joi.string().required(),
    })
    return schema.validate(wallet);
}


exports.Wallet = Wallet;
exports.validate = validateWallet;

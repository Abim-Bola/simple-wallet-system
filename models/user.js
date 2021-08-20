const mongoose = require("mongoose");
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },

});
userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id}, process.env.SECRET);
  return token;
}
const User = mongoose.model("User", userSchema);

function validateUser(user){
    const schema = Joi.object({
        // name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
    return schema.validate(user);
}



exports.User = User;
exports.validate = validateUser;


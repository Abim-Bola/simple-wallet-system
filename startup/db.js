const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const db = process.env.db
module.exports = function () {   
mongoose.connect(db, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database connected'))
}
const mongoose = require('mongoose');

module.exports = function () {   
mongoose.connect('mongodb+srv://abimbola:bolarious199715@testcluster.rxal0.mongodb.net/test', {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => winston.info('Database connected'))
}
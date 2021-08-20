const express = require('express');
const user = require("../routes/user");
const wallet = require("../routes/wallet");
const transaction = require("../routes/transaction");
// const error = require('../middleware/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/user/', user);
    app.use('/api/wallet/', wallet);
    app.use('/api/transaction/', transaction);
    // app.use(error);
}
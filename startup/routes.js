const express = require('express');
const user = require("../routes/user");
const error = require('../middleware/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/user/', genre);
    app.use(error);
}
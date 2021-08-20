const express = require("express");

const app = express();


require('./startup/routes')(app);
require('./startup/db')();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` listening on port ${PORT}`));

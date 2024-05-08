const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const tnotificRoute = require('./routes/tnotific.js');
const tproductRoute = require('./routes/tproduct.js');
const usersRoute = require('./routes/users.js');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use("/tnotific", tnotificRoute);
app.use("/tproduct", tproductRoute);
app.use("/users", usersRoute);


module.exports = app;
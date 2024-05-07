const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const usersRoute = require('./routes/users.js');
const tproductRoute = require('./routes/tproduct.js');

app.use(bodyParser.json());

app.use("/users", usersRoute);
app.use("/tproduct", tproductRoute)

module.exports = app;
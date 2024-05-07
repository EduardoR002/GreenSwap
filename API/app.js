const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const usersRoute = require('./routes/users.js');
const tproductRoute = require('./routes/tproduct.js');
const tnotificationRoute = require('./routes/tnotification.js');


app.use(bodyParser.json());

app.use("/users", usersRoute);
app.use("/tproduct", tproductRoute);
app.use("/tnotification", tnotificationRoute);

module.exports = app;
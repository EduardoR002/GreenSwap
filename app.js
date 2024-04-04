const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const postsRoute = require('./routes/users.js');

app.use(bodyParser.json());

app.use("/users", postsRoute);

module.exports = app;
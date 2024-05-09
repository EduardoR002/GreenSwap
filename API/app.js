const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const tnotificRoute = require('./routes/tnotific.js');
const usersRoute = require('./routes/users.js');
const tproductRoute = require('./routes/tproduct.js');
const tchangeRoute = require('./routes/tchange.js');
const tpurchaseRoute = require('./routes/tpurchase.js');
const tproposalRoute = require('./routes/proposaltype.js');
const proposalstateRoute = require('./routes/proposalstate.js');
const purchasetateRoute = require('./routes/purchasestate.js');
const requestsetateRoute = require('./routes/requeststate.js');



app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use("/tnotific", tnotificRoute);
app.use("/tproduct", tproductRoute);
app.use("/users", usersRoute);
app.use("/tproduct", tproductRoute);
app.use("/tchange", tchangeRoute);
app.use("/tpurchase", tpurchaseRoute);
app.use("/tproposal", tproposalRoute);
app.use("/proposalstate", proposalstateRoute);
app.use("/purchasestate", purchasetateRoute);
app.use("/requestsetate", requestsetateRoute);



module.exports = app;
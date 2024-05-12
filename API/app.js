const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

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
const certifierRoute = require('./routes/certifier.js');
const certificateRoute = require('./routes/certificate.js');
const requestsellerRoute = require('./routes/requestseller.js');
const tokenRoute = require('./routes/tokens.js');


function authenticateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, '0f1ab83a576c30f57aa5c33de4009cc923923ac041f6f63af8daa1a5ad53254a', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        // Store user information in request for use in subsequent middleware or routes
        req.user = decoded;
        next();
    });
}


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
app.use("/certifier", certifierRoute);
app.use("/certificate", certificateRoute);
app.use("/requestseller", requestsellerRoute);
app.use("/tokens", tokenRoute);



module.exports = app;
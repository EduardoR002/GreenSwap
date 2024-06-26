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
const requeststateRoute = require('./routes/requeststate.js');
const certifierRoute = require('./routes/certifier.js');
const certificateRoute = require('./routes/certificate.js');
const requestsellerRoute = require('./routes/requestseller.js');
const stockchangeRoute = require('./routes/stockchange.js');
const productRoute = require('./routes/product.js');
const sellerRoute = require('./routes/seller.js');
const proposalRoute = require('./routes/proposal.js');
const purchaseRoute = require('./routes/purchase.js');
const notificationRoute = require('./routes/notification.js');
const tokenRoute = require('./routes/tokens.js');
const favoritesRoute = require('./routes/favorites.js');
const evalutationRoute = require('./routes/evaluation.js');

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
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use("/evaluation", evalutationRoute);
app.use("/favorites", favoritesRoute);
app.use("/tnotific", tnotificRoute);
app.use("/tproduct", tproductRoute);
app.use("/users", usersRoute);
app.use("/tchange", tchangeRoute);
app.use("/tpurchase", tpurchaseRoute);
app.use("/tproposal", tproposalRoute);
app.use("/proposalstate", proposalstateRoute);
app.use("/purchasestate", purchasetateRoute);
app.use("/requeststate", requeststateRoute);
app.use("/certifier", certifierRoute);
app.use("/certificate", certificateRoute);
app.use("/requestseller", requestsellerRoute);
app.use("/product", productRoute);
app.use("/changestock", stockchangeRoute);
app.use("/seller", sellerRoute);
app.use("/proposal", proposalRoute);
app.use("/purchase", purchaseRoute);
app.use("/notification", notificationRoute);
app.use("/tokens", tokenRoute);

module.exports = app;
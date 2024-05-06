var DataTypes = require("sequelize").DataTypes;
var _certificate = require("./certificate");
var _certifier = require("./certifier");
var _notification = require("./notification");
var _product = require("./product");
var _proposal = require("./proposal");
var _proposalstate = require("./proposalstate");
var _proposaltype = require("./proposaltype");
var _purchase = require("./purchase");
var _purchasestate = require("./purchasestate");
var _purchasetype = require("./purchasetype");
var _requestseller = require("./requestseller");
var _requeststate = require("./requeststate");
var _seller = require("./seller");
var _stockchanges = require("./stockchanges");
var _typechange = require("./typechange");
var _typenotification = require("./typenotification");
var _typeproduct = require("./typeproduct");
var _user = require("./user");

function initModels(sequelize) {
  var certificate = _certificate(sequelize, DataTypes);
  var certifier = _certifier(sequelize, DataTypes);
  var notification = _notification(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var proposal = _proposal(sequelize, DataTypes);
  var proposalstate = _proposalstate(sequelize, DataTypes);
  var proposaltype = _proposaltype(sequelize, DataTypes);
  var purchase = _purchase(sequelize, DataTypes);
  var purchasestate = _purchasestate(sequelize, DataTypes);
  var purchasetype = _purchasetype(sequelize, DataTypes);
  var requestseller = _requestseller(sequelize, DataTypes);
  var requeststate = _requeststate(sequelize, DataTypes);
  var seller = _seller(sequelize, DataTypes);
  var stockchanges = _stockchanges(sequelize, DataTypes);
  var typechange = _typechange(sequelize, DataTypes);
  var typenotification = _typenotification(sequelize, DataTypes);
  var typeproduct = _typeproduct(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  notification.belongsTo(certificate, { as: "idcertificate_certificate", foreignKey: "idcertificate"});
  certificate.hasMany(notification, { as: "notifications", foreignKey: "idcertificate"});
  seller.belongsTo(certificate, { as: "idcertificate_certificate", foreignKey: "idcertificate"});
  certificate.hasMany(seller, { as: "sellers", foreignKey: "idcertificate"});
  certificate.belongsTo(certifier, { as: "idcertifier_certifier", foreignKey: "idcertifier"});
  certifier.hasMany(certificate, { as: "certificates", foreignKey: "idcertifier"});
  proposal.belongsTo(product, { as: "idproduct_product", foreignKey: "idproduct"});
  product.hasMany(proposal, { as: "proposals", foreignKey: "idproduct"});
  purchase.belongsTo(product, { as: "idproduct_product", foreignKey: "idproduct"});
  product.hasMany(purchase, { as: "purchases", foreignKey: "idproduct"});
  stockchanges.belongsTo(product, { as: "idproduct_product", foreignKey: "idproduct"});
  product.hasMany(stockchanges, { as: "stockchanges", foreignKey: "idproduct"});
  notification.belongsTo(proposal, { as: "idproposal_proposal", foreignKey: "idproposal"});
  proposal.hasMany(notification, { as: "notifications", foreignKey: "idproposal"});
  proposal.belongsTo(proposalstate, { as: "idproposalstate_proposalstate", foreignKey: "idproposalstate"});
  proposalstate.hasMany(proposal, { as: "proposals", foreignKey: "idproposalstate"});
  proposal.belongsTo(proposaltype, { as: "idproposaltype_proposaltype", foreignKey: "idproposaltype"});
  proposaltype.hasMany(proposal, { as: "proposals", foreignKey: "idproposaltype"});
  notification.belongsTo(purchase, { as: "idpurchase_purchase", foreignKey: "idpurchase"});
  purchase.hasMany(notification, { as: "notifications", foreignKey: "idpurchase"});
  purchase.belongsTo(purchasestate, { as: "idpurchasestate_purchasestate", foreignKey: "idpurchasestate"});
  purchasestate.hasMany(purchase, { as: "purchases", foreignKey: "idpurchasestate"});
  purchase.belongsTo(purchasetype, { as: "idtypepurchase_purchasetype", foreignKey: "idtypepurchase"});
  purchasetype.hasMany(purchase, { as: "purchases", foreignKey: "idtypepurchase"});
  notification.belongsTo(requestseller, { as: "idrequest_requestseller", foreignKey: "idrequest"});
  requestseller.hasMany(notification, { as: "notifications", foreignKey: "idrequest"});
  seller.belongsTo(requestseller, { as: "idrequest_requestseller", foreignKey: "idrequest"});
  requestseller.hasMany(seller, { as: "sellers", foreignKey: "idrequest"});
  requestseller.belongsTo(requeststate, { as: "idstate_requeststate", foreignKey: "idstate"});
  requeststate.hasMany(requestseller, { as: "requestsellers", foreignKey: "idstate"});
  product.belongsTo(seller, { as: "idseller_seller", foreignKey: "idseller"});
  seller.hasMany(product, { as: "products", foreignKey: "idseller"});
  stockchanges.belongsTo(typechange, { as: "idtypechange_typechange", foreignKey: "idtypechange"});
  typechange.hasMany(stockchanges, { as: "stockchanges", foreignKey: "idtypechange"});
  notification.belongsTo(typenotification, { as: "idtypenotification_typenotification", foreignKey: "idtypenotification"});
  typenotification.hasMany(notification, { as: "notifications", foreignKey: "idtypenotification"});
  product.belongsTo(typeproduct, { as: "idtypeproduct_typeproduct", foreignKey: "idtypeproduct"});
  typeproduct.hasMany(product, { as: "products", foreignKey: "idtypeproduct"});
  proposal.belongsTo(user, { as: "iduser_user", foreignKey: "iduser"});
  user.hasMany(proposal, { as: "proposals", foreignKey: "iduser"});
  purchase.belongsTo(user, { as: "iduser_user", foreignKey: "iduser"});
  user.hasMany(purchase, { as: "purchases", foreignKey: "iduser"});
  requestseller.belongsTo(user, { as: "iduser_user", foreignKey: "iduser"});
  user.hasMany(requestseller, { as: "requestsellers", foreignKey: "iduser"});

  return {
    certificate,
    certifier,
    notification,
    product,
    proposal,
    proposalstate,
    proposaltype,
    purchase,
    purchasestate,
    purchasetype,
    requestseller,
    requeststate,
    seller,
    stockchanges,
    typechange,
    typenotification,
    typeproduct,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

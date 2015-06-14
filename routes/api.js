/*
 * Serve JSON to our AngularJS client
 */
var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
	local.model.mysql.database,
	local.model.mysql.account,
	local.model.mysql.password,
	local.model.mysql.options
);

exports.name = function (req, res) {
  res.json({
    name: 'Elton'
  });
};
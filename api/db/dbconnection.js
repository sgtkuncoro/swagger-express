"use strict";

var Sequelize = require("sequelize");
var env = require("../env");

var db = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USERNAME,
  env.DATABASE_PASSWORD,
  {
    operatorsAliases: false,
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dialect: env.DATABASE_DIALECT,
    logging: false
  }
);

db.authenticate()
  .then(function() {
    console.log("Connection has been established successfully.");
  })
  .catch(function(err) {
    console.error("Unable to connect to the database: ", err);
  });

module.exports = db;

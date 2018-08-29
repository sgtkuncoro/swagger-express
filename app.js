"use strict";

var fs = require("fs");
var yaml = require("js-yaml");
var SwaggerExpress = require("swagger-express-mw");
var express = require("express");
var dotenv = require("dotenv");
var cors = require("cors");
var env = require("./api/env");
var db = require("./api/db");
dotenv.config();
var app = express();

var host_name = env.HOST_NAME;
var port = env.PORT;

try {
  var swaggerObject = yaml.safeLoad(
    fs.readFileSync("./api/swagger/swagger.yaml", "utf8")
  );
  swaggerObject.host = host_name + ":" + port;
} catch (err) {
  console.error(err);
}

//--- middleware ---//
app.use(cors());
app.use("/docs", express.static("api/docs"));
app.use("/docs/swagger.yaml", express.static("api/swagger/swagger.yaml"));

var config = {
  appRoot: __dirname,
  swagger: swaggerObject
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }

  swaggerExpress.register(app);
  //--- error handle ---//
  app.use(function(err, req, res, next) {
    // console.log(err)
    var msg =
      err.errors == undefined
        ? "Schema validation failed!"
        : err.errors[0].message;
    res.status(err.status || 403).json({
      success: false,
      message: msg
    });
  });
});

module.exports = app;

process.argv[1].indexOf("mocha") == -1
  ? app.listen(port, "0.0.0.0", function(err, res) {
      if (err) throw err;
      console.log("Server running on PORT : " + port);
    })
  : console.log("Mocha detected");

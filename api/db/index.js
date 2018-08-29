"use strict";

var Sequelize = require("sequelize");
var db = require("./dbconnection");

/* Models */
db.User = db.model("users", require("./models/users")(db, Sequelize));

//--- Clash Method ---//

// db.User.belongsTo(db.Table, {
//   foreignKey: "table_id"
// });

module.exports = db;

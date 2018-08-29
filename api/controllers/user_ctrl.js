"use strict";

var User = require("../db").User;

module.exports.userProfile = function(req, res, next) {
  var host = req.headers.host;
  var userId =
    req.swagger.params.userId.value == undefined
      ? 0
      : req.swagger.params.userId.value;

  if (userId == 0) {
    res.status(401).json({
      success: false,
      message: "User id is required. Please define user id"
    });
  } else {
    User.userProfile(userId)
      .then(function(result) {
        if (result == null) {
          res.status(404).json({
            success: false,
            message: "Data not available"
          });
        } else {
          res.status(200).json(result);
        }
      })
      .catch(next);
  }
};

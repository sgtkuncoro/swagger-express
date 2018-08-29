"use strict";

var should = require("should");
var User = require("../api/db").User;
var mongoose = require("mongoose");

describe("DB User", function() {
  describe("User.userProfile(userId)", function() {
    it("should be return object", function(done) {
      User.userInfo(1)
        .then(function(result) {
          should(result).be.instanceOf(Object);

          done();
        })
        .catch(done);
    });
  });
});

mongoose.disconnect();

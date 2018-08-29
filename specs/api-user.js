"use strict";

var should = require("should");
var request = require("supertest");
var jwt = require("jsonwebtoken");
var cfg = require("../api/configure/auth/config");
var server = require("../app");
var db = require("../api/db");
var fs = require("fs");
var cert = fs.readFileSync("api/configure/jwtRS256.key");
var token = "";

after(function() {
  db.close();
});

describe("Api User", function() {
  describe("GET /v1/user/{userId}", function() {
    it("shoud return JSON object", function(done) {
      request(server)
        .get("/v1/user/1")
        .set("Authorization", token)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, result) {
          should(result.body).be.instanceOf(Object);
          done();
        });
    });

    it('shoud return status code 404 and message "Data not available"', function(done) {
      request(server)
        .get("/v1/user/404")
        .set("Authorization", token)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404)
        .end(function(err, result) {
          should(result.body.message).be.equal("Data not available");
          done();
        });
    });

    it('shoud return status code 400 and message "User id is required. Please define user id"', function(done) {
      request(server)
        .get("/v1/user/0")
        .set("Authorization", token)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401)
        .end(function(err, result) {
          should(result.body.message).be.equal(
            "User id is required. Please define user id"
          );
          done();
        });
    });

    it("should contain property id, first_name, last_name, username, email", function(done) {
      request(server)
        .get("/v1/user/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, result) {
          should(result.body)
            .have.property("id")
            .which.is.a.Number();
          should(result.body)
            .have.property("first_name")
            .which.is.a.String();
          should(result.body)
            .have.property("last_name")
            .which.is.a.String();
          should(result.body)
            .have.property("username")
            .which.is.a.String();
          should(result.body)
            .have.property("email")
            .which.is.a.String();
          done();
        });
    });
  });
});

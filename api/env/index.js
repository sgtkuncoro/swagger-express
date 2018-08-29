'use strict';

var path = require('path');
var devConfigPath = path.join(__dirname, './development.js');
var testConfigPath = path.join(__dirname, './testing.js');
var prodConfigPath = path.join(__dirname, './production.js');

var inProduction = (process.env.NODE_ENV === 'production');
var inTesting = (process.env.NODE_ENV === 'testing');

module.exports = inProduction ? require(prodConfigPath) : (inTesting ? require(testConfigPath) : require(devConfigPath));

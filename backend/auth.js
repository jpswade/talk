'use strict';

const jwt = require('jsonwebtoken');

function authenticate(user) {
  return jwt.sign(user, process.env.APP_SECRET);
}

function decode(token) {
  return jwt.verify(token, process.env.APP_SECRET);
}

module.exports = { authenticate, decode };

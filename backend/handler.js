'use strict';

const graphql = require ('./graphql');

module.exports.query = (event, context, callback) => {
  graphql(event.query)
    .then((response) => callback(null, response))
    .catch((error) => callback(error));
};

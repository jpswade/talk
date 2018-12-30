'use strict';

const graphql = require ('./graphql');

module.exports.graphql = (event, context, callback) => {
  graphql(event.body)
  .then(
      response => callback(null, { statusCode: 200, body: JSON.stringify(response) }),
      error => callback(error)
    );
};

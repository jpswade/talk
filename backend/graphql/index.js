'use strict';

const graphql = require('graphql').graphql;
const Schema = require('./schema');

module.exports = (query) => {
  if (!query) {
    Promise.reject('Empty query.');
  }

  query = JSON.parse(query);

  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (query.hasOwnProperty('query')) {
    query = query.query.replace("\n", ' ', "g");
  }

  return graphql(Schema, query);
};

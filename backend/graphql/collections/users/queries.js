'use strict';

const { GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");

const UserType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  users: {
    type: new GraphQLList(UserType),
    description: 'List of users',
    resolve: function(source, args) {
      return resolves.getAll();
    }
  },
  user: {
    type: UserType,
    description: 'User',
    args: {
      id: { type: GraphQLString },
      email: { type: GraphQLString },
      username: { type: GraphQLString },
    },
    resolve: function (source, args) {
      if (args.id) {
        return validate(args).then(() => resolves.get(args.id));
      }
      if (args.email) {
        return validate(args).then(() => resolves.getUserByEmail(args.email));
      }
    }
  },
  email: {
    type: UserType,
    description: 'User Email',
    args: {
      email: { type: GraphQLString }
    },
    resolve: function (source, args) {
      return validate(args).then(() => resolves.getUserByEmail(args.email));
    }
  },
};

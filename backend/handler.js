const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const bcryptjs = require("bcryptjs");
const uuid = require('uuid');

const wait = foo => {
  new Promise((resolve, reject) => {
    foo((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const usersTable = process.env.PROJECT + "-users";

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require("graphql");

// This method just inserts the user's first name into the greeting message.
const signIn = user => {
  const email = user.email;
  const password = user.password;
  wait(callback =>
    dynamoDb.get(
      {
        TableName: usersTable,
        IndexName: "emailIndex",
        KeyConditionExpression: "email = :email",
        ProjectionExpression:
          "id, username, email, password, createdAt, updatedAt",
        ExpressionAttributeValues: {
          ":email": email
        }
      },
      callback
    )
  )
    .then(result => {
      if (!result.Item) {
        return "User not found.";
      }
      let match = bcryptjs.compareSync(password, Item.password);
      if (!match) {
        return "Invalid password.";
      }
      delete Item.password;
      return result.Item;
    })
    .then(result => `Hello, ${Item.username}.`);
};

const signUp = user => {
  user.id = uuid.v1();
  user.password = bcryptjs.hashSync(user.password, 10);
  user.createdAt = String(Date.now());
  user.updatedAt = String(Date.now());
  wait(callback =>
    dynamoDb.put(
      {
        TableName: usersTable,
        Item: user
      },
      callback
    )
  ).then(() => username);
};

// Here we declare the schema and resolvers for the query
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "User",
    description: "User",
    fields: () => ({
      id: { type: GraphQLString },
      email: { type: GraphQLString },
      username: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString }
    })
  })
});

// We want to make a GET request with ?query=<graphql query>
// The event properties are specific to AWS. Other providers will differ.
module.exports.query = (event, context, callback) => {
  graphql(schema, event.queryStringParameters.query).then(
    result => callback(null, { statusCode: 200, body: JSON.stringify(result) }),
    err => callback(err)
  );
};

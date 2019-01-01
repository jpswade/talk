"use strict";

const Promise = require("bluebird");
const DynamoDB = require("aws-sdk").DynamoDB;

let dynamoConfig = {
  sessionToken: process.env.AWS_SESSION_TOKEN,
  accessKeyId: process.env.DEFAULT_ACCESS_KEY,
  secretAccessKey: process.env.DEFAULT_SECRET,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION
};

if (process.env.IS_OFFLINE) {
  dynamoConfig["endpoint"] =
    "http://localhost:" + process.env.DYNAMODB_LOCAL_PORT;
  dynamoConfig["region"] = "localhost";
}

const client = new DynamoDB.DocumentClient(dynamoConfig);

module.exports = (method, params) => {
  return Promise.fromCallback(cb => client[method](params, cb));
};

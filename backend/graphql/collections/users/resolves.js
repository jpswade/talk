'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const db = require('../../../dynamodb');
const authenticate = require('../../../auth').authenticate;
const decode = require('../../../auth').decode;
const gravatar = require('gravatar');

const tableName = 'users';
const projectName = process.env.PROJECT;
const usersTable = projectName + '-' + tableName;

module.exports = {
  signUp(user) {
    user.id = uuid.v1();

    user.password = bcryptjs.hashSync(user.password, 10);

    user.createdAt = String(Date.now());
    user.updatedAt = String(Date.now());

    let putItem = db('put', {
      TableName: usersTable,
      Item: user,
      ConditionExpression: 'attribute_not_exists(username) OR attribute_not_exists(email)',
    });

    return putItem
    .then(() => user);
  },

  signIn(user) {
    const email = user.email;
    const password = user.password;

    return db('query', {
      TableName: usersTable,
      IndexName: 'emailIndex',
      KeyConditionExpression: 'email = :email',
      ProjectionExpression: 'id, username, email, password, createdAt, updatedAt',
      ExpressionAttributeValues: {
        ':email': email
      }
    }).then(result => {
      const Item = result.Items[0];
      if (!Item) return Promise.reject('User not found');

      let match = bcryptjs.compareSync(password, Item.password);
      if (!match) return Promise.reject('Invalid credentials');

      delete Item.password;

      Item.jwt = authenticate(Item);
      Item.gravatar = gravatar.url(Item.email, {s: '100', r: 'x', d: 'retro'}, true);

      return Item;
    });
  },

  getAll() {
    return db('scan', {
      TableName: usersTable,
      ProjectionExpression: 'id, username, email, createdAt, updatedAt'
    }).then(result => result.Items);
  },

  get(id) {
    return db('get', {
      TableName: usersTable,
      Key: { id },
      ProjectionExpression: 'id, username, email, createdAt, updatedAt'
    }).then(result => {
      const Item = result.Item;
      if (!Item) return Promise.reject('User not found');

      Item.gravatar = gravatar.url(Item.email, {s: '100', r: 'x', d: 'retro'}, true);

      return Item;
    });
  },

  getUserByEmail(email) {
    return db('query', {
      TableName: usersTable,
      IndexName: 'emailIndex',
      KeyConditionExpression: 'email = :email',
      ProjectionExpression: 'id, username, email, createdAt, updatedAt',
      ExpressionAttributeValues: {
        ':email': email
      }
    }).then(result => {
      const Item = result.Items[0];
      if (!Item) return Promise.reject('User not found');
      return Item;
    });
  },

  updateCurrentUser(user) {
    let userId = decode(user.jwt).id;

    return db('update', {
      TableName: usersTable,
      Key: { id: userId },
      UpdateExpression: 'SET email = :email, username = :username, password = :password, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':email': user.email,
        ':username': user.username,
        ':password': bcryptjs.hashSync(user.password, 10),
        ':updatedAt': String(Date.now())
      },
      ReturnValues: 'ALL_NEW'
    }).then(result => {
      return result.Attributes;
    })
  },
  
  deleteCurrentUser(user) {
    let userId = decode(user.jwt).id;

    return db('delete', {
      TableName: usersTable,
      Key: { id: userId },
      ReturnValues: 'ALL_OLD'
    }).then(result => {
      return result.Attributes;
    });
  }
};

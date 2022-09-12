'use strict';
import {} from "dotenv/config.js";
import { DynamoDB } from 'aws-sdk'
const dynamoDb = new DynamoDB.DocumentClient()


module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.USER_TABLE,
    Key: {
        'email': event.pathParameters.email
      }
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: `Couldn't fetch user`,
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
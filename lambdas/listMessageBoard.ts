'use strict';
import { } from "dotenv/config.js";

import { DynamoDB } from 'aws-sdk'
const dynamoDb = new DynamoDB.DocumentClient()
const params = {
    TableName: process.env.MESSAGE_BOARD,
};

module.exports.list = (event, context, callback) => {
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: `Couldn't fetch message boards`,
            });
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
    });
};
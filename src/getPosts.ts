'use strict';
import { } from "dotenv/config.js";

import { DynamoDB } from 'aws-sdk'
console.log("===>", process.env.MESSAGE_POST);
const dynamoDb = new DynamoDB.DocumentClient()
export function getPosts() {
    const params = {
        TableName: process.env.MESSAGE_POST,
    };

    dynamoDb.scan(params, (error, result) => {
        if (error) {
            return {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: `Couldn't fetch posts`,
            };
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
        return response;
    });
}
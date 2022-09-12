'use strict'

import * as uuid from 'uuid';
import { DynamoDB } from 'aws-sdk';
import {} from "dotenv/config.js";
const dynamoDb = new DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime()
  const data = JSON.parse(event.body)

  data.id = uuid.v4()
  data.createdAt = timestamp;
  data.updatedAt = timestamp;
  const params = {
    TableName: process.env.MESSAGE_BOARD,
    Item: data
  }

  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(new Error(`Couldn't store message board`))
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    }
    callback(null, response)
  })
}
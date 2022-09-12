'use strict'
import {} from "dotenv/config.js";
import * as uuid from 'uuid';
import { DynamoDB } from 'aws-sdk';
const dynamoDb = new DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime()
  const data = JSON.parse(event.body)

  data.id = uuid.v4()
  data.createdAt = timestamp;
  data.updatedAt = timestamp;
  const params = {
    TableName: process.env.MESSAGE_POST,
    Item: data
  }

  dynamoDb.put(params, (error, result) => {
    console.log("🚀 ~ file: postMessage.ts ~ line 21 ~ dynamoDb.put ~ result", result)
    if (error) {
      console.error(error)
      callback(new Error(`Couldn't post message`))
      return
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    }
    callback(null, response)
  })
}
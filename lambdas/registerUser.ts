'use strict'

import * as uuid from 'uuid';
import { DynamoDB, SNS } from 'aws-sdk';
import { } from "dotenv/config.js";

const dynamoDb = new DynamoDB.DocumentClient()
const sns = new SNS();
module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime()
  const data = JSON.parse(event.body)

  data.id = uuid.v4()
  data.createdAt = timestamp;
  data.updatedAt = timestamp;
  const params = {
    TableName: process.env.USER_TABLE,
    Item: data
  }

  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(new Error(`Couldn't register user`))
      return
    }
    const param = {
      Message: params.Item.id,
      TopicArn: `arn:aws:sns:us-east-1:694257519134:returnUserId`
    }
    sns.publish(param, (error) => {
      if (error) {
        callback(new Error(`Something went wrong`))
        return;
      }else{
        const response = {
          statusCode: 200,
          body: JSON.stringify({meessage: 'Successfull'})
        }
        callback(null, response)
      }
    })
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    }
    callback(null, response)
  })
}
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable no-console */
const AWS = require('aws-sdk')

const CONFIG_PERSONS_TABLE = process.env.CONFIG_PERSONS_TABLE
const CONFIG_PERSONS_DYNAMODB_ENDPOINT = process.env.CONFIG_DYNAMODB_ENDPOINT
const IS_OFFLINE = process.env.IS_OFFLINE
console.log('  ~ file: index.js ~ line 6 ~ IS_OFFLINE', IS_OFFLINE)

export const handler = async () => {
  let dynamoDb

  if (IS_OFFLINE === 'true') {
    dynamoDb = new AWS.DynamoDB({
      region: 'localhost',
      endpoint: CONFIG_PERSONS_DYNAMODB_ENDPOINT,
    })
  } else {
    dynamoDb = new AWS.DynamoDB.DocumentClient()
  }

  const dbParams = {
    TableName: CONFIG_PERSONS_TABLE,
  }

  const result = await dynamoDb.scan(dbParams).promise()
  // eslint-disable-next-line no-console
  console.dir(result, { depth: null })

  // eslint-disable-next-line no-console
  console.log('lambda')
}

/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable no-console */
import AWS from 'aws-sdk'
// import fs from 'fs-extra'
// import path from 'path'
import initialSeed from '../config/initialSeed'

// const CONFIG_PERSONS_TABLE = process.env.CONFIG_PERSONS_TABLE
const CONFIG_PERSONS_DYNAMODB_ENDPOINT = process.env.CONFIG_DYNAMODB_ENDPOINT
const IS_OFFLINE = process.env.IS_OFFLINE
console.log('  ~ file: index.js ~ line 6 ~ IS_OFFLINE', IS_OFFLINE)

// const getData = (seed = 'initialSeed') => {
//   const data = fs.readJsonSync(`../data/${seed}.json`)
//   console.log('  ~ file: seed.js ~ line 15 ~ getData ~ data', data)
//   return data
// }

export const handler = async () => {
  let dynamoDb

  if (IS_OFFLINE === 'true') {
    dynamoDb = new AWS.DynamoDB({
      region: 'localhost',
      endpoint: CONFIG_PERSONS_DYNAMODB_ENDPOINT,
      accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
      secretAccessKey: 'DEFAULT_SECRET', // needed if you don't have aws credentials at all in env
    })
  } else {
    dynamoDb = new AWS.DynamoDB.DocumentClient()
  }
  console.log('  ~ file: seed.js ~ line 21 ~ handler ~ dynamoDb', dynamoDb)

  // const data = getData()
  // console.log('  ~ file: seed.js ~ line 35 ~ handler ~ data', data)

  // const seedParams = {
  //   TableName: CONFIG_PERSONS_TABLE,
  //   Item: {
  //     personId: { S: '' + new Date().getTime() },
  //     name: { S: 'john' },
  //     familyName: { S: 'doe' },
  //   },
  // }

  try {
    await dynamoDb.batchWriteItem(initialSeed).promise()
    // res.json({ status: '200' })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    // res.status(400).json({ error: 'error writing person' })
  }

  // eslint-disable-next-line no-console
  console.log('lambda')
}

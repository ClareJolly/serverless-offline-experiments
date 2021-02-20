import bodyParser from 'body-parser'
import serverless from 'serverless-http'
import express from 'express'
import AWS from 'aws-sdk'
const app = express()

const CONFIG_PERSONS_TABLE = process.env.CONFIG_PERSONS_TABLE
const CONFIG_PERSONS_DYNAMODB_ENDPOINT = process.env.CONFIG_DYNAMODB_ENDPOINT
const IS_OFFLINE = process.env.IS_OFFLINE

let dynamoDb

if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: CONFIG_PERSONS_DYNAMODB_ENDPOINT,
  })
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient()
}

app.use(bodyParser.json({ strict: false, limit: '10mb' }))

/**
 * get a list of all existing persons
 */
app.get('/persons', async (req, res) => {
  const dbParams = {
    TableName: CONFIG_PERSONS_TABLE,
  }

  const result = await dynamoDb.scan(dbParams).promise()
  res.json({ persons: result.Items })
})

/**
 * add a new person with some predefined data
 */
app.post('/persons', async (req, res) => {
  const dbParams = {
    TableName: CONFIG_PERSONS_TABLE,
    Item: {
      personId: '' + new Date().getTime(),
      name: 'john',
      familyName: 'doe',
    },
  }

  try {
    await dynamoDb.put(dbParams).promise()
    res.json({ status: '200' })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    res.status(400).json({ error: 'error writing person' })
  }
})

export const handler = serverless(app)

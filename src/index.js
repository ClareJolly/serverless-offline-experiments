/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable no-console */
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

const CONFIG_PERSONS_TABLE = process.env.CONFIG_PERSONS_TABLE
const CONFIG_PERSONS_DYNAMODB_ENDPOINT = process.env.CONFIG_DYNAMODB_ENDPOINT
const IS_OFFLINE = process.env.IS_OFFLINE

export const handler = async () => {
  console.log('testtesttest')
  // const server = new S3rver([options])
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

  const S3 = new AWS.S3({
    s3ForcePathStyle: true,
    accessKeyId: 'S3RVER', // This specific key is required when working offline
    secretAccessKey: 'S3RVER',
    endpoint: new AWS.Endpoint('http://localhost:8000'),
  })
  // const cb = (err, data) => {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log(data)
  //   }
  // }
  await S3.putObject(
    {
      Bucket: 'local-bucket',
      Key: '1234',
      // Body: new Buffer.from('abcd'),
      Body: 'test',
    },
    () => {}
  )
  // var params = {
  //   Bucket: 'local-bucket',
  //   Key: '1234',
  // }

  await S3.listObjectsV2({ Bucket: 'local-bucket' }, () => {
    console.log('list')
  })
  // S3.getObject(cb) //.promise()
  // const { Body: body } = await S3.getObject(params).promise()
  // console.log('  ~ file: index.js ~ line 51 ~ handler ~ body', body)
  // console.log('  ~ file: index.js ~ line 51 ~ handler ~ froms3', String(body))

  // eslint-disable-next-line no-console
  console.log('lambda')
}

import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'

export const webhook = async (event, context, callback) => {
  const S3 = new AWS.S3({
    s3ForcePathStyle: true,
    accessKeyId: 'S3RVER', // This specific key is required when working offline
    secretAccessKey: 'S3RVER',
    endpoint: new AWS.Endpoint('http://localhost:4569'),
  })

  await S3.putObject({
    Bucket: 'local-bucket',
    Key: uuidv4(),
    Body: new Buffer.from('abcd'),
  }).promise()

  const obj = await S3.getObject({
    Bucket: 'local-bucket',
    Key: 'xxxxx',
  }).promise()

  console.log('obj', obj)

  const data = await S3.listObjectsV2({ Bucket: 'local-bucket' }).promise()

  console.log('LIST: ', data)
}

import dotenv from 'dotenv'
dotenv.config()

const CONFIG_PERSONS_TABLE = process.env.CONFIG_PERSONS_TABLE
import { v4 as uuidv4 } from 'uuid'

const initialSeed = {
  RequestItems: {
    [CONFIG_PERSONS_TABLE]: [
      {
        PutRequest: {
          Item: {
            personId: { S: uuidv4() },
            name: { S: 'a' },
            familyName: { S: 'z' },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            personId: { S: uuidv4() },
            name: { S: 'b' },
            familyName: { S: 'y' },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            personId: { S: uuidv4() },
            name: { S: 'c' },
            familyName: { S: 'x' },
          },
        },
      },
    ],
  },
}

export default initialSeed

# Serverless Offline Experiments <!-- omit in toc -->

Trying out a few things using serverless offline - specifically related to AWS Services:

- [x] lambda
- [x] dynamoDb
- [x] S3

---

## Contents <!-- omit in toc -->

- [Pre-requisites](#pre-requisites)
- [Set up](#set-up)
- [Troubleshooting](#troubleshooting)
  - [In case the ports stay open](#in-case-the-ports-stay-open)
  - [To delete the .webpack folders and file](#to-delete-the-webpack-folders-and-file)
- [Acknowledgements](#acknowledgements)

---

## Pre-requisites

- perhaps serverless `npm add -g serverless` - I am using it locally in the package but it might also need a global install - will confirm this

---

## Set up

Clone the repo

- `yarn`

Note: for some reason I am having to run these commands with `sudo` - I need to look into why and alternative solutions

- install database `sudo yarn install:db`
  ~~- start database only `sudo yarn start:db`~~
  ~~- start offline server (db and s3 and rest): `sudo yarn start:offline`~~
- seed the database `sudo yarn seed`
- s3 test `sudo yarn s3`
- run main lambda `sudo yarn run`

---

## Troubleshooting

### In case the ports stay open

```bash
sudo lsof -i :8000
sudo lsof -i :3000
sudo lsof -i :8002
```

---

### To delete the .webpack folders and file

`sudo rm -rf .webpack`

---

## Acknowledgements

Originally got the set up from [this blog post](https://blog.codecentric.de/en/2019/08/developing-aws-locally-with-serverless-offline-plugins/) as other sources of information wouldn't work (either on my machine, or I messed it up somehow). So the initial few commits will be very similar to the source code mentioned in the blof post, but I intend to adapt this to my needs and extend it

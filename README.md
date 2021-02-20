# Serverless Offline Experiments

Trying out a few things using serverless offline - specifically related to AWS Services:

- lambda
- dynamoDb
- S3

---

## Pre-requisites

- perhaps serverless `npm add -g serverless` - I am using it locally in the package but it might also need a global install - will confirm this

---

## Set up

Clone the repo

-

Note: for some reason I am having to run these commands with `sudo` - I need to look into why and alternative solutions

- install database `sudo yarn install:db`
- start offline server: `sudo yarn start:offline`

---

## Troubleshooting

### In case the ports stay open

```bash
sudo lsof -i :8000
sudo lsof -i :3000
sudo lsof -i :8002
```

---

## Acknowledgements

Originally got the set up from [this blog post](https://blog.codecentric.de/en/2019/08/developing-aws-locally-with-serverless-offline-plugins/) as other sources of information wouldn't work (either on my machine, or I messed it up somehow). So the initial few commits will be very similar to the source code mentioned in the blof post, but I intend to adapt this to my needs and extend it

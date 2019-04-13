// AWS
const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const db = new DocumentClient();

const awsHandler = async (event, context) => {
  switch (event) {
    case 'a':
      break;
    case 'b':
      break;
    default:
      console.log('unknown event');
  }
};

exports.handler = awsHandler;

// AWS
const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const db = new DocumentClient();

const TableName = process.env.TABLE_NAME;

const awsHandler = async (event, context) => {
  switch (event) {
    case 'a':
      await db.put({
        TableName,
        Item: {
          ...event.body,
        },
      }).promise();
      break;
    case 'b':
      await db.get({
        TableName,
        Key: event.params.key,
      }).promise();
      break;
    default:
      console.log('unknown event');
  }
};

exports.handler = awsHandler;

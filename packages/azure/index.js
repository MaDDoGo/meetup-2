// Azure
// https://docs.microsoft.com/es-es/azure/azure-functions/functions-reference-node

const { CosmosClient } = require('@azure/cosmos/lib/src/CosmosClient');

const databaseId = 'Testdb';
const containerId = 'Testcontainer';

const endpoint = process.env.COSMOS_ENDPOINT || 'https://localhost:8081/';
const masterKey = process.env.COSMOS_SAMPLE_ENDPOINT || 'a_fake_key';

const client = new CosmosClient({ endpoint, auth: { masterKey } });

async function init() {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const { container } = await database.containers.createIfNotExists({ id: containerId });
  return { database, container };
}

const azureHandler = async (context) => {
  const {
    body,
    headers,
    method,
    originalUrl,
    params,
    query,
    rawBody,
  } = context.req;

  const { container, database } = await init();

  await container.items.create({
    ...body,
  });

  context.res = {
    body,
    headers,
    isRaw,
    status,
  };
  // context.res.send(body?: any)
  // context.done(null, res);
};

const read = async (id) => {
  const { container, database } = await init();

  const item = container.item(id);
  await item.read();
};

module.exports = {
  postHandler: azureHandler,
  getHandler: read,
};

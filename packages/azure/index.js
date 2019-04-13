// Azure
// https://docs.microsoft.com/es-es/azure/azure-functions/functions-reference-node
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

  context.res = {
    body,
    headers,
    isRaw,
    status,
  };
  // context.res.send(body?: any)
  // context.done(null, res);
};

// https://github.com/googleapis/nodejs-bigtable

const Bigtable = require('@google-cloud/bigtable');

// The name of the Cloud Bigtable instance
const INSTANCE_NAME = 'my-bigtable-instance';
// The name of the Cloud Bigtable table
const TABLE_NAME = 'my-table';


const init = async () => {
  // Creates a Bigtable client
  const bigtable = new Bigtable();

  // Connect to an existing instance:my-bigtable-instance
  const instance = bigtable.instance(INSTANCE_NAME);

  // Connect to an existing table:my-table
  const table = instance.table(TABLE_NAME);

  return { instance, table };
};

// Google Cloud Platform
// https://cloud.google.com/functions/docs/writing/http
const gcpHandler = async (req, res) => {
  req.status(200).send({});
  const { table } = init();

  const [result] = await table.insert([{
    key: 'alincoln',
    data: {
      follows: {
        gwashington: 1,
      },
    },
  }]);

  const [res] = await table.row(id).get();

  return res.status(200).send(result);
};

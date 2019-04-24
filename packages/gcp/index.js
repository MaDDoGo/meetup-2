const express = require('express');
const Firestore = require('@google-cloud/firestore');

const PROJECTID = 'ricosega';
const COLLECTION_NAME = 'cloud-functions-firestore';

const app = express();
const firestore = new Firestore({
    projectId: PROJECTID,
    timestampsInSnapshots: true
    // NOTE don't hardcode your project credentials here.
    // If you have to, export the following to your shell:
    //   GOOGLE_APPLICATION_CREDENTIALS=<path>
    // keyFilename: '/cred/cloud-functions-firestore-000000000000.json',
  });

app.put('/id/:id', (req, res) => {
    // store/insert a new document
    const id = req.params.id;

    // .add() will automatically assign an id
    return firestore
    .collection(COLLECTION_NAME)
    .doc(id)
    .set({
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }).then(doc => {
      console.info('stored new doc id#', doc.id);
      return res.status(200).send(doc);
    }).catch(err => {
      console.error(err);
      return res.status(404).send({
        error: 'unable to store',
        err
      });
    });
});

app.get('/id/:id', (req, res) => {
    const { id } = req.params;

    // read/retrieve an existing document by id
  return firestore.collection(COLLECTION_NAME)
  .doc(id)
  .get()
  .then(doc => {
    if (!(doc && doc.exists)) {
      return res.status(404).send({
        error: 'Unable to find the document'
      });
    }
    const data = doc.data();
    if (!data) {
      return res.status(404).send({
        error: 'Found document is empty'
      });
    }
    return res.status(200).send(data);
  }).catch(err => {
    console.error(err);
    return res.status(404).send({
      error: 'Unable to retrieve the document',
      err
    });
  });
});

module.exports = {
    app,
};

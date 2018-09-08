const Db = require('tingodb')().Db;

const db = new Db('../db/', {});
// Fetch a collection to insert document into
const collection = db.collection('database');

const document = Addressbook(null,"test");

// Insert a single document
collection.insert(document, { w: 1 }, (err, result) => {
    //    assert.equal(null, err);

  },
);

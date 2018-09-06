const Db = require('tingodb')().Db;

const assert = require('assert');

const db = new Db('../db/', {});
// Fetch a collection to insert document into
const collection = db.collection('batch_document_insert_collection_safe');
// Insert a single document
collection.insert([{ hello: 'world_safe1' },
  { hello: 'world_safe2' }], { w: 1 }, (err, result) => {
  assert.equal(null, err);

  // Fetch the document
  collection.findOne({ hello: 'world_safe2' }, (err, item) => {
    assert.equal(null, err);
    assert.equal('world_safe2', item.hello);
  });
});

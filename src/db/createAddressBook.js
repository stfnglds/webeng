const Engine = require('tingodb')();

const db = new Engine.Db('', {});

const entries = db.collection('addressbooks');

const json = {
  name: 'Hospital Address Book'
};

entries.insert(json);

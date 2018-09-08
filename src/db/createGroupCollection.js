const Engine = require('tingodb')();

const db = new Engine.Db('', {});

const entries = db.collection('groups');

const json = {
  name: 'General Hospital',
  book: 123456,
};

entries.insert(json);

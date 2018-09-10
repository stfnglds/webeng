const Engine = require('tingodb')();

const db = new Engine.Db('', {});

const entries = db.collection('entries');

const json = {
  name: 'New York Central Hospital',
  email: 'nyhp@ny.com',
  address: '41th street',
  rating: 3,
  group: 123456,
};

entries.insert(json);

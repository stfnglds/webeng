const Engine = require('tingodb')();
//const db = new Engine.Db('../db/', {});

const db = require('../common/db').db; //IMPORTANT

const collection = db.collection('database');

collection.find({}).toArray((error, list) => {
    console.log(JSON.stringify(list));
});

const utils = require('../common/utils');

const util = require('util');

const express = require('express');

const app = express();



const addressbooks = [
  { name: 'Hospitals' },
  { name: 'Schools' },
  { name: 'Restaurants' },
];
const groups = [
  { name: 'Bone Medicine' },
  { name: 'Teeth Medicine' },
  { name: 'Pre Schools' },
  { name: 'High Schools' },
  { name: 'Fish Restaurants' },
  { name: 'Meat Restaurants' },
];

const entries = [
  {
    id: 1,
    groups: {
      id: 0,
      name: 'string',
    },
    name: 'New York Central Hospital',
    email: 'nyhp@ny.com',
    address: '41th street',
    rating: 3,
  },
  {
    id: 0,
    groups: {
      id: 0,
      name: 'string',
    },
    name: 'Saint Clara Hospital Washington',
    email: 'sch@wsh.com',
    address: 'main street 5',
    rating: 4,
  },
];

const URL_ADDRESSBOOKS = '/api/addressbooks/';
const URL_GROUPS = '/api/groups/';
const URL_ENTRIES = '/api/entries/';

const URL_PLACEHOLDER_ID = ':id';


function getEntries() {
  return new Promise(((resolve, reject) => {
      collection.find("entries").toArray((error, list) => {
          resolve(list);
      });
  }));
}

// ADDRESSBOOKS

app.get('/api/entries/', (req, res, next) => {
  getEntries().then((entries) => {
    res.json(entries);
  }, (err) => {
    res.status(500).json(utils.createErrorObject(131, util.format('Failed to retrieve events %s', err)));
  });
});


app.get(URL_ADDRESSBOOKS + URL_PLACEHOLDER_ID, (req, res, next) => {
  res.send(addressbooks[req.param('id')]);
});

app.post(URL_ADDRESSBOOKS, (req, res) => {
  res.send('POST request to the homepage');
});


// GROUPS

app.get(URL_GROUPS, (req, res, next) => {
  res.send(groups);
});

app.get(URL_GROUPS + URL_PLACEHOLDER_ID, (req, res, next) => {
  res.send(groups[req.param('id')]);
});

app.post(URL_GROUPS, (req, res) => {
  res.send('POST request to the homepage');
});


// ENTRIES

app.get(URL_ENTRIES, (req, res, next) => {
  res.send(entries);
});

app.get(URL_ENTRIES + URL_PLACEHOLDER_ID, (req, res, next) => {
  res.send(entries[req.param('id')]);
});

app.post(URL_ENTRIES, (req, res) => {
  res.send('POST request to the homepage');
});

//-----------------------

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

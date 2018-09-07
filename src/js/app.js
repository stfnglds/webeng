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
  { name: 'New York Bone  Hospital' },
  { name: 'New York Teeth Hospital' },
  { name: 'New York Pre Schools' },
  { name: 'New YorkHigh Schools' },
  { name: 'Marvins Fish Restaurants' },
  { name: 'Davids Meat Restaurants' },
];

app.get('/api/addressbooks/', (req, res, next) => {
  res.send(addressbooks);
});

app.get('/api/groups/', (req, res, next) => {
  res.send(groups);
});

app.get('/api/entries/', (req, res, next) => {
  res.send(entries);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

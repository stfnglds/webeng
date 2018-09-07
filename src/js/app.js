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

const URL_ADDRESSBOOKS = '/api/addressbooks/';
const URL_GROUPS = '/api/groups/';
const URL_ENTRIES = '/api/entries/';


// ADDRESSBOOKS

app.get(URL_ADDRESSBOOKS, (req, res, next) => {
  res.send(addressbooks);
});

app.post(URL_ADDRESSBOOKS, (req, res) => {
  res.send('POST request to the homepage');
});

// GROUPS

app.get(URL_GROUPS, (req, res, next) => {
  res.send(groups);
});

app.post(URL_GROUPS, (req, res) => {
  res.send('POST request to the homepage');
});

// ENTRIES

app.get(URL_ENTRIES, (req, res, next) => {
  res.send(entries);
});

app.post(URL_ENTRIES, (req, res) => {
  res.send('POST request to the homepage');
});

//-----------------------

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

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

app.get('/api/addressbooks/', (req, res, next) => {
  res.send(addressbooks);
});

app.get('/api/groups/', (req, res, next) => {
  res.send(groups);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

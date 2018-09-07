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




// we now can assume the api key is valid,
// and simply expose the data

// example: http://localhost:3000/api/users/?api-key=foo
app.get('/api/addressbooks/', (req, res, next) => {
  res.send(addressbooks);
});

// example: http://localhost:3000/api/users/?api-key=foo
app.get('/api/groups/', (req, res, next) => {
    res.send(groups);
});

// example: http://localhost:3000/api/repos/?api-key=foo
app.get('/api/repos', (req, res, next) => {
  res.send("repos");
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/stuff/', (req, res) => {
  res.send(' stuff!');
});

app.get('/morestuff/', (req, res) => {
  res.send('morestuff !');
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

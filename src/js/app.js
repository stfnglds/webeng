const express = require('express');

const app = express();

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

const Engine = require('tingodb')();

const db = new Engine.Db('', {});

const collection = db.collection('entries.json');

collection.find({}).toArray((error, list) => {
    console.log(list);
});

const Engine = require('tingodb')();
const db = new Engine.Db('../db/', {});
const collection = db.collection('database');

collection.find({}).toArray((error, list) => {
    console.log(JSON.stringify(list));
});


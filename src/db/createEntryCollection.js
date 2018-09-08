const Engine = require('tingodb')();

const db = new Engine.Db('', {});

const collection = db.collection('database');

collection.find({}).toArray((error, list) => {
    console.log(list);
    });


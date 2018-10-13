const Engine = require('tingodb')();

const db = new Engine.Db('', {});

const collection = db.collection('addressbooks.json');

collection.update({}, {$unset: {editMode:1}}, {multi: true});

collection.find({}).toArray((error, list) => {
    console.log(list);
});

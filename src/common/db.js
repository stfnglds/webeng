const tingodb = require('tingodb')();
const path = require('path');

// Initialize a new TingoDB in local file system
const db = new tingodb.Db(path.join(__dirname, '/../db'), {});

exports.db = db;

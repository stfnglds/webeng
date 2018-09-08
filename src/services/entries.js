const Engine = require('tingodb')();
// const db = new Engine.Db('../db/', {});

const db = require('../common/db').db; // IMPORTANT

const entriesCollection = db.collection('entries');
const groupsCollection = db.collection('groups');
const addressbooksCollection = db.collection('addressbooks');
const utils = require('../common/utils');
const schema = require('../common/schema');
const validate = require('express-jsonschema').validate;
const util = require('util');
const logger = require('../common/logger');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();



// parse application/json
app.use(bodyParser.json());

const URL_ADDRESSBOOKS = '/api/addressbooks/';
const URL_GROUPS = '/api/groups/';
const URL_ENTRIES = '/api/entries/';

const URL_PLACEHOLDER_ID = ':id';

function transformPostData(data) {
  const result = data;

  // Convert the _id field from the DB to ID property
  result.id = result._id;
  delete result._id;

  // Remove userId field as this is just used to store all events in a flat structure
  // delete result.userId;

  return result;
}

function getEntries() {
  return new Promise(((resolve, reject) => {
    entriesCollection.find({}).toArray((error, list) => {
      resolve(list);
    });
  }));
}

function getGroups() {
  return new Promise(((resolve, reject) => {
    groupsCollection.find({}).toArray((error, list) => {
      resolve(list);
    });
  }));
}

function getAddressbooks() {
  return new Promise(((resolve, reject) => {
    addressbooksCollection.find({}).toArray((error, list) => {
      resolve(list);
    });
  }));
}

function addEntry(newEntry) {
  // console.log(entry);
  // const newEntry = transformPostData(entry);
  return new Promise(((resolve, reject) => {
    entriesCollection.insert(newEntry, (error, result) => {
      console.log(result);
      resolve(result);
    });
  }));
}

app.get('/api/entries/', (req, res, next) => {
  getEntries().then((entries) => {
    res.json(entries);
  }, (err) => {
    res.status(500).json(utils.createErrorObject(131, util.format('Failed to retrieve entries %s', err)));
  });
});

app.post('/', (request, response) => {
  console.log(request.body); // your JSON
  response.send(request.body); // echo the result back
});

app.post('/api/entries/', validate({ body: schema.EntryCreate }), (req, res) => {
  console.log(req.body);
  addEntry(req.body).then((entry) => {
    logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, entry));
    res.json(entry);
  }, (err) => {
    logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
    res.status(500).json(utils.createErrorObject(131, util.format('Failed to create entry %s', err)));
  });
});

app.use((err, req, res, next) => {
  let responseData;

  if (err.name === 'JsonSchemaValidation') {
    // Log the error however you please
    console.log(err.message);
    // logs "express-jsonschema: Invalid data found"

    // Set a bad request http response status or whatever you want
    res.status(400);

    // Format the response body however you want
    responseData = {
      statusText: 'Bad Request',
      jsonSchemaValidation: true,
      validations: err.validations, // All of your validation information
    };

    // Take into account the content type if your app serves various content types
    if (req.xhr || req.get('Content-Type') === 'application/json') {
      res.json(responseData);
    } else {
      // If this is an html request then you should probably have
      // some type of Bad Request html template to respond with
      res.render('badrequestTemplate', responseData);
    }
  } else {
    // pass error to next error middleware handler
    next(err);
  }
});

app.get('/api/groups/', (req, res, next) => {
  getGroups().then((groups) => {
    res.json(groups);
  }, (err) => {
    res.status(500).json(utils.createErrorObject(131, util.format('Failed to retrieve groups %s', err)));
  });
});

app.get('/api/addressbooks/', (req, res, next) => {
  getAddressbooks().then((addressbooks) => {
    res.json(addressbooks);
  }, (err) => {
    res.status(500).json(utils.createErrorObject(131, util.format('Failed to retrieve addressbooks %s', err)));
  });
});


app.get(URL_ADDRESSBOOKS + URL_PLACEHOLDER_ID, (req, res, next) => {
  res.send(addressbooksCollection[req.param('id')]);
});

app.post(URL_ADDRESSBOOKS, (req, res) => {
  res.send('POST request to the homepage');
});


// GROUPS

app.get(URL_GROUPS, (req, res, next) => {
  res.send(groupsCollection);
});

app.get(URL_GROUPS + URL_PLACEHOLDER_ID, (req, res, next) => {
  res.send(groupsCollection[req.param('id')]);
});

app.post(URL_GROUPS, (req, res) => {
  res.send('POST request to the homepage');
});


// ENTRIES

app.get(URL_ENTRIES, (req, res, next) => {
  res.send(entriesCollection);
});

app.get(URL_ENTRIES + URL_PLACEHOLDER_ID, (req, res, next) => {
  res.send(entriesCollection[req.param('id')]);
});

app.post(URL_ENTRIES, (req, res) => {
  res.send('POST request to the homepage');
});

//-----------------------

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

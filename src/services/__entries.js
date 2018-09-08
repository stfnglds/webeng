const express = require('express');

const app = express();

const db = require('../common/db').db;

function getEntries() {
  return new Promise(((resolve, reject) => {
    const events = db.collection('Events');
    const query = {};
    events.find(query).toArray((error, list) => {
      list.forEach((part, index, theArray) => {
        theArray[index] = transformEvent(part); // eslint-disable-line no-param-reassign
      });

      resolve(list);
    });
  }));
}

app.get('/entries/', (req, res, next) => {
  getEntries().then((entries) => {
    if (entries == null) {
      res.status(404).json(utils.createErrorObject(131, util.format('Unknown event ID %s', req.params.eventId)));
      return;
    }
    res.json(entries);
  }, (err) => {
    res.status(500).json(utils.createErrorObject(131, util.format('Failed to retrieve event %s', err)));
  });
});


app.get('entries/:entryId', (req, res, next) => {
  getEventById(req.userId, req.params.eventId).then((event) => {
    if (event == null) {
      res.status(404).json(utils.createErrorObject(131, util.format('Unknown event ID %s', req.params.eventId)));
      return;
    }
    res.json(event);
  }, (err) => {
    res.status(500).json(utils.createErrorObject(131, util.format('Failed to retrieve event %s', err)));
  });
});

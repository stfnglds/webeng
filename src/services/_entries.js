const express = require('express');
// const logger = require('../common/logger');

const router = express.Router();
const validate = require('express-jsonschema').validate;
const util = require('util');
const db = require('../common/db').db;
const schema = require('../common/schema');
const utils = require('../common/utils');

// ==============================================
// Helper Functions
// ==============================================

function transformEvent(event) {
  const result = event;

  // Convert the _id field from the DB to ID property
  result.id = result._id;
  delete result._id;

  // Remove userId field as this is just used to store all events in a flat structure
  // delete result.userId;

  return result;
}

// ==============================================
// Database Access
// ==============================================

/**
 * Get events by User ID
 *
 * @param userId user ID
 * @return {Array} List of events for current user
 */

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

/**
 * Add new event
 *
 * @param userId user ID
 * @param event event data
 * @return {Object} Event Details
 */
function addEntry(entry) {
  return new Promise(((resolve, reject) => {
    const entries = db.collection('Entries');

    // Add the Name as a property for later lookup
    const newEntry = entry;

    //entries.insert(newEntry, (error, result) => {
    //  resolve(transformEvent(result[0]));
    //});
  }));
}

/**
 * Get event by User ID + Event ID
 *
 * @param entryId event ID
 * @return {Object} event or null if not found
 */
function getEntryById(entryId) {
  return new Promise(((resolve, reject) => {
    const events = db.collection('Events');
    const query = {
      _id: entryId,
    };
    events.findOne(query, (error, item) => {
      resolve(item);
    });
  }));
}

/**
 * Remove event
 *
 * @param userId user ID
 * @param eventId event ID
 */
function removeEvent(userId, eventId) {
  return new Promise(((resolve, reject) => {
    const events = db.collection('Events');
    const query = {
      userId,
      _id: eventId,
    };
    events.remove(query, (error, item) => {
      resolve();
    });
  }));
}

/**
 * Update event
 *
 * @param userId user ID
 * @param eventId event ID
 * @param event event data
 * @return {Object} Event Details
 */
function updateEvent(userId, eventId, event) {
  return new Promise(((resolve, reject) => {
    const entry = db.collection('Entries');
    const query = {
      userId,
      _id: eventId,
    };

    // Add the User ID as a property for later lookup
    const newEvent = event;
    newEvent.userId = userId;

    entry.update(query, newEvent, (error, item) => {
      resolve(transformEvent(item));
    });
  }));
}

// ==============================================
// REST Endpoints
// ==============================================

router.get('/', (req, res, next) => {
  // logger.debug(util.format('GET /calendar/%s/events', req.userId));

  getEntries(req.userId).then((events) => {
    // logger.debug(util.format('GET /calendar/%s/events - 200 - %j', req.userId, events));
    res.json(events);
  }, (err) => {
    // logger.debug(util.format('GET /calendar/%s/events - 500', req.userId));
    res.status(500).json(utils.createErrorObject(131, util.format('Failed to retrieve events %s', err)));
  });
});

router.post('/', validate({ body: schema.EventCreate }), (req, res, next) => {
  // logger.debug(util.format('POST /calendar/%s/events - %j', req.userId, req.body));

  addEntry(req.body).then((event) => {
    //   logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, event));
    res.json(event);
  }, (err) => {
    // logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
    res.status(500).json(utils.createErrorObject(131, util.format('Failed to create event %s', err)));
  });
});

router.get('/:entryId', (req, res, next) => {
  // logger.debug(util.format('GET /calendar/%s/events/%s', req.userId, req.params.eventId));

  getEventById(req.userId, req.params.eventId).then((event) => {
    if (event == null) {
      //    logger.debug(util.format('GET /calendar/%s/events/%s - 404', req.userId, req.params.eventId));
      res.status(404).json(utils.createErrorObject(131, util.format('Unknown event ID %s', req.params.eventId)));
      return;
    }

    //  logger.debug(util.format('GET /calendar/%s/events/%s - 200 - %j', req.userId, req.params.eventId, event));
    res.json(event);
  }, (err) => {
    //  logger.debug(util.format('GET /calendar/%s/events/%s - 500', req.userId));
    res.status(500).json(utils.createErrorObject(131, util.format('Failed to retrieve event %s', err)));
  });
});

router.put('/:eventId', validate({ body: schema.EventCreate }), (req, res, next) => {
  logger.debug(util.format('PUT /calendar/%s/events/%s', req.userId, req.params.eventId));

  getEventById(req.userId, req.params.eventId).then((event) => {
    if (event == null) {
      logger.debug(util.format('PUT /calendar/%s/events/%s - 404', req.userId, req.params.eventId));
      res.status(404).json(utils.createErrorObject(151, util.format('Unknown event ID %s', req.params.eventId)));
      return;
    }

    updateEvent(req.userId, req.params.eventId, req.body).then(() => {
      logger.debug(util.format('PUT /calendar/%s/events/%s - 200 - %j', req.userId, req.params.eventId, event));
      res.json(event);
    }, (err) => {
      logger.debug(util.format('PUT /calendar/%s/events/%s - 500', req.userId));
      res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete event %s', err)));
    });
  }, (err) => {
    logger.debug(util.format('PUT /calendar/%s/events/%s - 500', req.userId));
    res.status(500).json(utils.createErrorObject(131, util.format('Failed to update event %s', err)));
  });
});

router.delete('/:eventId', (req, res, next) => {
  logger.debug(util.format('DELETE /calendar/%s/events/%s', req.userId, req.params.eventId));

  getEventById(req.userId, req.params.eventId).then((event) => {
    if (event == null) {
      logger.debug(util.format('DELETE /calendar/%s/events/%s - 404', req.userId, req.params.eventId));
      res.status(404).json(utils.createErrorObject(151, util.format('Unknown event ID %s', req.params.eventId)));
      return;
    }

    removeEvent(req.userId, req.params.eventId).then(() => {
      logger.debug(util.format('DELETE /calendar/%s/events/%s - 204', req.userId, req.params.eventId));
      res.sendStatus(204);
    }, (err) => {
      logger.debug(util.format('DELETE /calendar/%s/events/%s - 500', req.userId));
      res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete event %s', err)));
    });
  }, (err) => {
    logger.debug(util.format('DELETE /calendar/%s/events/%s - 500', req.userId));
    res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete event %s', err)));
  });
});

module.exports = router;

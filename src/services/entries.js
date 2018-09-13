const express = require('express');

var tingodb = require('tingodb')();
var path = require('path');

// Initialize a new SQLite DB in memory
var database = new tingodb.Db(path.join(__dirname, '/../db'), {});
console.log(path.join(__dirname, '/../db'));

var entriesCollection = database.collection('entries');
var groupsCollection = database.collection('groups');
var addressbooksCollection = database.collection('addressbooks');



//const Engine = require('tingodb')();
//const db = new Engine.Db('../db/', {});


const validate = require('express-jsonschema').validate;
const util = require('util');



const bodyParser = require('body-parser');
//const database = require('../common/db').db; // IMPORTANT
//console.log(db.collection('entries').insert({test:'test'}));

const app = express();

const logger = require('../common/logger');
const utils = require('../common/utils');
const schema = require('../common/schema');

// parse application/json
app.use(bodyParser.json());



function transformData(data) {
    const result = data;
    // Convert the _id field from the DB to ID property
    result.id = result._id;
    delete result._id;

    return result;
}



/*
                                 _
                                | |
  __ _  ___ _ __   ___ _ __ __ _| |
 / _` |/ _ \ '_ \ / _ \ '__/ _` | |
| (_| |  __/ | | |  __/ | | (_| | |
 \__, |\___|_| |_|\___|_|  \__,_|_|
  __/ |
 |___/
 */

app.use((err, req, res, next) => {
// Enable CORS for local testing
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Cache-Control, Pragma');

    // Disable caching
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0);
    res.setHeader('Last-Modified', (new Date()).toUTCString());

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }

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


app.get('/test/', (request, response) => {
    console.log(request.body); // your JSON
    response.send(request.body); // echo the result back
});

/*
            _
           | |
  ___ _ __ | |_ _ __ _   _
 / _ \ '_ \| __| '__| | | |
|  __/ | | | |_| |  | |_| |
 \___|_| |_|\__|_|   \__, |
                      __/ |
                     |___/
 */


function getEntries() {
    return new Promise(((resolve, reject) => {
        entriesCollection.find({}).toArray((error, list) => {
            list.forEach((part, index, theArray) => {
                theArray[index] = transformData(part); // eslint-disable-line no-param-reassign
            });
            resolve(list);
        });
    }));
}

function getEntryById(entryId) {
    return new Promise(((resolve, reject) => {
        entriesCollection.find({ _id: entryId }).toArray((error, list) => {
            list.forEach((part, index, theArray) => {
                theArray[index] = transformData(part); // eslint-disable-line no-param-reassign
            });
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


/**
 * Update entry
 *
 * @param entryId entry ID
 * @param entry entry data
 * @return {Object} entry Details
 */
function updateEntry(entryId, entry) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: entryId,
        };

        entriesCollection.update(query, entry, (error, item) => {
            resolve(transformData(item));
        });
    }));
}

app.put('/api/entries/:entryId', validate({ body: schema.EntryCreate }), (req, res, next) => {
    getEntryById(req.params.entryId).then((entry) => {
        if (entry == null) {
            res.status(404).json(utils.createErrorObject(151, util.format('Unknown entry ID %s', req.params.entryId)));
            return;
        }

        updateEntry(req.params.entryId, req.body).then(() => {
            res.json(entry);
        }, (err) => {
            res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete entry %s', err)));
        });
    }, (err) => {
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to update entry %s', err)));
    });
});

function removeEntry(eventId) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: eventId,
        };
        entriesCollection.remove(query, (error, item) => {
            resolve();
        });
    }));
}

app.delete('/api/entries/:entryId', (req, res, next) => {
    getEntryById(req.params.id).then((entry) => {
        if (entry == null) {
            res.status(404).json(utils.createErrorObject(151, util.format('Unknown entry ID %s', req.params.entryId)));
            return;
        }

        removeEntry(req.params.entryId).then(() => {
            res.sendStatus(204);
        }, (err) => {
            res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete entry %s', err)));
        });
    }, (err) => {
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete entry %s', err)));
    });
});


/*
           _     _                   _                 _
          | |   | |                 | |               | |
  __ _  __| | __| |_ __ ___  ___ ___| |__   ___   ___ | | __
 / _` |/ _` |/ _` | '__/ _ \/ __/ __| '_ \ / _ \ / _ \| |/ /
| (_| | (_| | (_| | | |  __/\__ \__ \ |_) | (_) | (_) |   <
 \__,_|\__,_|\__,_|_|  \___||___/___/_.__/ \___/ \___/|_|\_\
 */


function getAddressbooks() {
    return new Promise(((resolve, reject) => {
        addressbooksCollection.find({}).toArray((error, list) => {
            resolve(list);
        });
    }));
}


app.get('/api/addressbooks/', (req, res, next) => {
    getAddressbooks().then((addressbooks) => {
        res.json(addressbooks);
    }, (err) => {
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to retrieve addressbooks %s', err)));
    });
});

/*
  __ _ _ __ ___  _   _ _ __  ___
 / _` | '__/ _ \| | | | '_ \/ __|
| (_| | | | (_) | |_| | |_) \__ \
 \__, |_|  \___/ \__,_| .__/|___/
  __/ |               | |
 |___/                |_|
 */


function getGroupById(groupId) {
    return new Promise(((resolve, reject) => {
        entriesCollection.find({ _id: groupId }).toArray((error, list) => {
            list.forEach((part, index, theArray) => {
                theArray[index] = transformData(part); // eslint-disable-line no-param-reassign
            });
            resolve(list);
        });
    }));
}

function removeGroup(groupId) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: groupId,
        };
        groupsCollection.remove(query, (error, item) => {
            resolve();
        });
    }));
}

app.delete('/api/groups/:groupId', (req, res, next) => {
    getGroupById(req.params.id).then((group) => {
        if (group == null) {
            res.status(404).json(utils.createErrorObject(151, util.format('Unknown group ID %s', req.params.groupId)));
            return;
        }

        removeGroup(req.params.groupId).then(() => {
            res.sendStatus(204);
        }, (err) => {
            res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete group %s', err)));
        });
    }, (err) => {
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete group %s', err)));
    });
});


function getGroups() {
    return new Promise(((resolve, reject) => {
        groupsCollection.find({}).toArray((error, list) => {
            resolve(list);
        });
    }));
}


app.get('/api/groups/', (req, res, next) => {
    getGroups().then((groups) => {
        res.json(groups);
    }, (err) => {
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to retrieve groups %s', err)));
    });
});


app.delete('/api/groups/:groupId', (req, res, next) => {
    getGroupById(req.params.id).then((group) => {
        if (group == null) {
            res.status(404).json(utils.createErrorObject(151, util.format('Unknown group ID %s', req.params.groupId)));
            return;
        }

        removeGroup(req.params.groupId).then(() => {
            res.sendStatus(204);
        }, (err) => {
            res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete group %s', err)));
        });
    }, (err) => {
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete group %s', err)));
    });
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

const express = require('express');
const cors = require('cors');
const tingodb = require('tingodb')();
const path = require('path');

const database = new tingodb.Db(path.join(__dirname, '/../db'), {});
const entriesCollection = database.collection('entries.json');
const groupsCollection = database.collection('groups.json');
const addressbooksCollection = database.collection('addressbooks.json');
// eslint-disable-next-line prefer-destructuring
const validate = require('express-jsonschema').validate;
const util = require('util');
const bodyParser = require('body-parser');

const app = express();
const utils = require('../common/utils');
const schema = require('../common/schema');

// parse application/json
app.use(bodyParser.json());

// use CORS for Cross Requests
app.use(cors());


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
        // console.log(`API DEBUG, ${err.message}`);
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
    // console.log(`API DEBUG, ${request.body}`); // your JSON
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


/**
 * get entry
 *
 * @return {Object} entry Details
 */
function getEntries() {
    return new Promise(((resolve, reject) => {
        entriesCollection.find({})
            .toArray((error, list) => {
                if (error) {
                    console.log('API DEBUG, ' + `getEntries:${error}`);
                    reject(error);
                }
                if (list) {
                    list.forEach((part, index, theArray) => {
                        theArray[index] = part; // eslint-disable-line no-param-reassign
                    });
                    resolve(list);
                }
            });
    }));
}

/**
 * get entry by id
 *
 * @param {number} entryId entry ID
 * @return {Object} entry Details
 */
function getEntryById(entryId) {
    return new Promise((resolve, reject) => {
        // console.log('API DEBUG, '+ entryId);
        entriesCollection.findOne({ _id: entryId }, (error, result) => {
            if (error) { /* handle err */
                // console.log('API DEBUG, ' + `getEntryById: ${error}`);
                reject(error);
            }
            if (result) {
                resolve(result);
            } else {
                resolve(null);
            }
        });
    });
}

/**
 * add entry
 *
 * @return {Object} entry Details
 * @param {Object}newEntry
 */
function addEntry(newEntry) {
    // console.log('API DEBUG, '+ entry);
    return new Promise(((resolve, reject) => {
        const dbEntry = {};
        dbEntry.name = newEntry.name;
        dbEntry.address = newEntry.address;

        entriesCollection.insert(dbEntry, (error, result) => {
            if (error) {
                // console.log(`API DEBUG, ${error}`);
                reject(error);
            }
            if (result) {
                // console.log(`API DEBUG, ${result}`);
                resolve(result);
            }
        });
    }));
}

/**
 * Update entry
 *
 * @param {Number} entryId entry ID
 * @param {Object} entry original entry data
 * @return {Object} entry Details
 */
function updateEntry(entryId, entry) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: entryId,
        };

        const dbEntry = {};
        dbEntry.name = entry.name;
        dbEntry.address = entry.address;
        dbEntry.rating = entry.rating;
        dbEntry.group = entry.group;

        entriesCollection.update(query, dbEntry, (error, item) => {
            if (error) {
                reject(error);
            }
            if (item) {
                resolve(item);
            }
        });
    }));
}
/**
 * remove entry
 * @param {Number} eventId event ID
 */
function removeEntry(eventId) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: eventId,
        };
        entriesCollection.remove(query, (error, item) => {
            if (error) {
                console.log(`API DEBUG, ${error}`);
                reject(error);
            } else {
                resolve(item);
            }
        });
    }));
}

app.get('/api/entries/', (req, res) => {
    getEntries()
        .then((entries) => {
            res.json(entries);
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to retrieve entries %s', err)));
        });
});

app.post('/api/entries/', validate({ body: schema.EntryCreate }), (req, res) => {
    addEntry(req.body)
        .then((entry) => {
            res.json(entry);
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to create entry %s', err)));
        });
});

app.put('/api/entries/:entryId', validate({ body: schema.EntryCreate }), (req, res) => {
    getEntryById(req.params.entryId)
        .then((entry) => {
            if (entry == null) {
                res.status(404)
                    .json(utils.createErrorObject(151, util.format('Unknown entry ID %s', req.params.entryId)));
                return;
            }

            updateEntry(req.params.entryId, req.body)
                .then(() => {
                    res.json(entry);
                }, (err) => {
                    res.status(500)
                        .json(utils.createErrorObject(131, util.format('Failed to update entry %s', err)));
                });
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to update entry %s', err)));
        });
});


app.delete('/api/entries/:entryId', (req, res) => {
    getEntryById(req.params.entryId)
        .then((entry) => {
            if (entry == null) {
                res.status(404)
                    .json(utils.createErrorObject(151, util.format('Unknown entry ID %s', req.params.entryId)));
                return;
            }

            removeEntry(req.params.entryId)
                .then(() => {
                    res.sendStatus(204);
                }, (err) => {
                    // console.log('API DEBUG, '+ "fehler" + err);
                    res.status(500)
                        .json(utils.createErrorObject(131, util.format('Failed to delete entry %s', err)));
                });
        }, (err) => {
            // console.log('API DEBUG, '+ "no id found" + err);
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to delete entry %s', err)));
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


/**
 * get all addressbooks
 *
 * @return {Object} addressbooks Details
 */
function getAddressbooks() {
    return new Promise(((resolve, reject) => {
        addressbooksCollection.find({})
            .toArray((error, list) => {
                // console.log(`API DEBUG, ${error}`);
                if (error) {
                    reject(error);
                }
                if (list) {
                    resolve(list);
                }
            });
    }));
}

/**
 * get addressbook by id
 *
 * @return {Object} adressbook Details
 * @param {Number} addressbookId
 */
function getAddressbookById(addressbookId) {
    return new Promise(((resolve, reject) => {
        addressbooksCollection.findOne({ _id: addressbookId }, (error, result) => {
            if (error) { /* handle err */
                reject(error);
            }
            if (result) {
                resolve(result);
            } else {
                resolve(null);
            }
        });
    }));
}

/**
 * create new addressbook
 *
 * @return {Object} addresbook Details
 * @param {Object} newAddressbook
 */
function addAddressbook(newAddressbook) {
    // console.log('API DEBUG, '+ entry);
    return new Promise(((resolve, reject) => {
        const dbAddressbook = {};
        dbAddressbook.name = newAddressbook.name;

        addressbooksCollection.insert(dbAddressbook, (error, result) => {
            if (error) {
                // console.log(`API DEBUG, ${error}`);
                reject(error);
            }
            if (result) {
                // console.log(`API DEBUG, ${result}`);
                resolve(result);
            }
        });
    }));
}

/**
 * Update addressbook
 *
 * @param {Number} addressbookId addressbook ID
 * @param {Object} addressbook
 * @return {Object} new addressbook Details
 */
function updateAddressbook(addressbookId, addressbook) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: addressbookId,
        };

        const updatedAddressbook = {};
        updatedAddressbook.name = addressbook.name;

        addressbooksCollection.update(query, addressbook, (error, item) => {
            if (error) {
                reject(error);
            }
            if (item) {
                resolve(item);
            }
        });
    }));
}

/**
 * remove addressbook by id
 *
 * @param {Number} addressbookId
 */
function removeAddressbook(addressbookId) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: addressbookId,
        };
        addressbooksCollection.remove(query, (error, item) => {
            if (error) {
                console.log(`API DEBUG, ${error}`);
                reject(error);
            }
            if (item) {
                resolve();
            }
        });
    }));
}

app.get('/api/addressbooks/', (req, res) => {
    getAddressbooks()
        .then((addressbooks) => {
            res.json(addressbooks);
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to retrieve addressbooks %s', err)));
        });
});

app.get('/api/addressbooks/:addressbookId', (req, res) => {
    getAddressbookById(req.params.addressbookId)
        .then((addressbook) => {
            if (addressbook == null) {
                res.status(404)
                    .json(utils.createErrorObject(151, util.format('Unknown addressbook ID %s', req.params.addressbookId)));
                return;
            }
            res.json(addressbook);
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to get addressbook %s', err)));
        });
});

app.post('/api/addressbooks/', validate({ body: schema.AddressbookCreate }), (req, res) => {
    // console.log(`API DEBUG, ${req.body}`);
    addAddressbook(req.body)
        .then((addressbook) => {
            res.json(addressbook);
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to create addressbook %s', err)));
        });
});

app.put('/api/addressbooks/:addressbookId', validate({ body: schema.AddressbookCreate }), (req, res) => {
    getAddressbookById(req.params.addressbookId)
        .then((addressbook) => {
            if (addressbook == null) {
                res.status(404)
                    .json(utils.createErrorObject(151, util.format('Unknown addressbook ID %s', req.params.addressbookId)));
                return;
            }


            updateAddressbook(req.params.addressbookId, req.body)
                .then(() => {
                    res.json(addressbook);
                }, (err) => {
                    res.status(500)
                        .json(utils.createErrorObject(131, util.format('Failed to update addressbook %s', err)));
                });
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to update addressbook %s', err)));
        });
});

app.delete('/api/addressbooks/:addressbookId', (req, res) => {
    getAddressbookById(req.params.addressbookId)
        .then((addressbook) => {
            if (addressbook == null) {
                res.status(404)
                    .json(utils.createErrorObject(151, util.format('Unknown addressbook ID %s', req.params.addressbookId)));
                return;
            }

            removeAddressbook(req.params.addressbookId)
                .then(() => {
                    res.sendStatus(204);
                }, (err) => {
                    res.status(500)
                        .json(utils.createErrorObject(131, util.format('Failed to delete addressbook %s', err)));
                });
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to delete addressbook %s', err)));
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


/**
 * get all groups
 *
 * @return {Object} group Details
 */
function getGroups() {
    return new Promise(((resolve, reject) => {
        groupsCollection.find({})
            .toArray((error, list) => {
                if (error) {
                    reject(error);
                }
                if (list) {
                    resolve(list);
                }
            });
    }));
}

/**
 * get groups by id
 *
 * @return {Object} groups Details
 * @param {Number} groupId
 */
function getGroupById(groupId) {
    return new Promise(((resolve, reject) => {
        groupsCollection.findOne({ _id: groupId }, (error, result) => {
            if (error) { /* handle err */
                reject(error);
            }
            if (result) {
                resolve(result);
            } else {
                resolve(null);
            }
        });
    }));
}

/**
 * remove group by id
 *
 * @param {Number}groupId
 */
function removeGroup(groupId) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: groupId,
        };
        groupsCollection.remove(query, (error, item) => {
            if (error) {
                reject(error);
            } else {
                resolve(item);
            }
        });
    }));
}

/**
 * add groups
 *
 * @return {Object} group Details
 * @param {Object}newGroup new group data
 */
function addGroup(newGroup) {
    // console.log('API DEBUG, '+ entry);
    return new Promise(((resolve, reject) => {
        const dbGroup = {};
        dbGroup.name = newGroup.name;

        groupsCollection.insert(dbGroup, (error, result) => {
            if (error) {
                reject(error);
            }
            if (result) {
                console.log(`API DEBUG, ${result}`);
                resolve(result);
            }
        });
    }));
}

/**
 * Update group
 *
 * @param groupId group ID
 * @param group group data
 * @return {Object} group Details
 */
function updateGroup(groupId, group) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: groupId,
        };

        const updatedGroup = {};
        updatedGroup.name = group.name;

        groupsCollection.update(query, group, (error, item) => {
            if (error) {
                reject(error);
            }
            if (item) {
                resolve(item);
            }
        });
    }));
}


app.get('/api/groups/', (req, res) => {
    getGroups()
        .then((groups) => {
            res.json(groups);
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to retrieve groups %s', err)));
        });
});

app.get('/api/groups/:groupId', (req, res) => {
    getGroupById(req.params.groupId)
        .then((group) => {
            if (group == null) {
                res.status(404)
                    .json(utils.createErrorObject(151, util.format('Unknown group ID %s', req.params.groupId)));
                return;
            }
            res.json(group);
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to retrieve group %s', err)));
        });
});

app.post('/api/groups/', validate({ body: schema.GroupCreate }), (req, res) => {
    console.log(`API DEBUG, ${req.body}`);
    addGroup(req.body)
        .then((group) => {
            res.json(group);
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to create groupName %s', err)));
        });
});

app.put('/api/groups/:groupId', validate({ body: schema.GroupCreate }), (req, res) => {
    getGroupById(req.params.groupId)
        .then((group) => {
            if (group == null) {
                res.status(404)
                    .json(utils.createErrorObject(151, util.format('Unknown groupName ID %s', req.params.groupId)));
                return;
            }

            updateGroup(req.params.groupId, req.body)
                .then(() => {
                    res.json(group);
                }, (err) => {
                    res.status(500)
                        .json(utils.createErrorObject(131, util.format('Failed to delete groupName %s', err)));
                });
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to update groupName %s', err)));
        });
});

app.delete('/api/groups/:groupId', (req, res) => {
    getGroupById(req.params.groupId)
        .then((group) => {
            if (group == null) {
                res.status(404)
                    .json(utils.createErrorObject(151, util.format('Unknown groupName ID %s', req.params.groupId)));
                return;
            }

            removeGroup(req.params.groupId)
                .then(() => {
                    res.sendStatus(204);
                }, (err) => {
                    res.status(500)
                        .json(utils.createErrorObject(131, util.format('Failed to delete groupName %s', err)));
                });
        }, (err) => {
            res.status(500)
                .json(utils.createErrorObject(131, util.format('Failed to delete groupName %s', err)));
        });
});


app.listen(3000, () => {
    console.log('API DEBUG, ' + 'API listening on port 3000!');
});

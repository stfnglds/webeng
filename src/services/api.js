const express = require('express');
const cors = require('cors');
const tingodb = require('tingodb')();
const path = require('path');
const database = new tingodb.Db(path.join(__dirname, '/../db'), {});
const entriesCollection = database.collection('entries');
const groupsCollection = database.collection('groups');
const addressbooksCollection = database.collection('addressbooks');
const validate = require('express-jsonschema').validate;
const util = require('util');
const bodyParser = require('body-parser');
const app = express();
const logger = require('../common/logger');
const utils = require('../common/utils');
const schema = require('../common/schema');

// parse application/json
app.use(bodyParser.json());

//use CORS for Cross Requests
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


/**
 * get entry
 *
 * @return {Object} entry Details
 */
function getEntries() {
    return new Promise(((resolve, reject) => {
        entriesCollection.find({}).toArray((error, list) => {
            if(error){
                resolve(error);
            }
            if(list){
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
 * @param entryId entry ID
 * @return {Object} entry Details
 */
function getEntryById(entryId) {
    return new Promise(((resolve, reject) => {
        entriesCollection.find({_id: entryId}).toArray((error, list) => {
            list.forEach((part, index, theArray) => {
                theArray[index] = part; // eslint-disable-line no-param-reassign
            });
            resolve(list);
        });
    }));
}


/**
 * add entry
 *
 * @return {Object} entry Details
 * @param newEntry
 */
function addEntry(newEntry) {
    // console.log(entry);
    return new Promise(((resolve, reject) => {

        var dbEntry = {};
        dbEntry.name = newEntry.name;
        dbEntry.address = newEntry.address;

        entriesCollection.insert(dbEntry, (error, result) => {
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

app.post('/api/entries/', validate({body: schema.EntryCreate}), (req, res) => {
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
            if(error){
                resolve(error);
            }
            resolve(item);
        });
    }));
}


app.put('/api/entries/:entryId', validate({body: schema.EntryCreate}), (req, res, next) => {
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


/**
 * remove entry
 *
 * @return {Object} entry Details
 * @param eventId
 */
function removeEntry(eventId) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: eventId,
        };
        entriesCollection.remove(query, (error, item) => {
            if(error){
                resolve(error);
            }else {
                resolve();
            }
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

/**
 * get addressbook by id
 *
 * @return {Object} entry Details
 * @param addressbookId
 */
function getAddressbookById(addressbookId) {
    return new Promise(((resolve, reject) => {
        addressbooksCollection.find({_id: addressbookId}).toArray((error, list) => {
            list.forEach((part, index, theArray) => {
                theArray[index] = part; // eslint-disable-line no-param-reassign
            });
            resolve(list);
        });
    }));
}
/**
 * get addressbook by id
 *
 * @return {Object} entry Details
 * @param addressbookId
 */
function removeAddressbook(addressbookId) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: addressbookId,
        };
        addressbooksCollection.remove(query, (error, item) => {
            resolve();
        });
    }));
}

/**
 * get addressbook by id
 *
 * @return {Object} entry Details
 * @param newAddressbook
 */
function addAddressbook(newAddressbook) {
    // console.log(entry);
    return new Promise(((resolve, reject) => {

        var dbAddressbook = {name: "Restaurants"};
        //dbAddressbook.name=newAddressbook.name;

        addressbooksCollection.insert(dbAddressbook, (error, result) => {
            console.log(result);
            console.log(error);
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    }));
}


app.post('/api/addressbooks/', validate({body: schema.AddressbookCreate}), (req, res) => {
    console.log(req.body);
    addAddressbook(req.body).then((addressbook) => {
        //logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, addressbook));
        res.json(addressbook);
    }, (err) => {
        //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to create addressbook %s', err)));
    });
});

app.get('/api/addressbooks/:addressbookId', (req, res, next) => {
    getAddressbookById(req.params.id).then((addressbook) => {
        if (addressbook == null) {
            res.status(404).json(utils.createErrorObject(151, util.format('Unknown addressbook ID %s', req.params.addressbookId)));
            return;
        }

        removeAddressbook(req.params.addressbookId).then(() => {
            res.sendStatus(204);
        }, (err) => {
            res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete addressbook %s', err)));
        });
    }, (err) => {
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete addressbook %s', err)));
    });
});

/**
 * Update entry
 *
 * @param addressbookId entry ID
 * @param addressbook
 * @return {Object} entry Details
 */
function updateAddressbook(addressbookId, addressbook) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: addressbookId,
        };

        var updatedAddressbook = {};
        updatedAddressbook.name = addressbook.name;

        addressbooksCollection.update(query, addressbook, (error, item) => {
            if (error) {
                reject(error);
            }
            resolve(item);
        });
    }));
}

app.put('/api/addressbooks/:addressbookId', validate({body: schema.AddressbookCreate}), (req, res, next) => {
    getAddressbookById(req.params.addressbookId).then((addressbook) => {
        if (addressbook == null) {
            res.status(404).json(utils.createErrorObject(151, util.format('Unknown addressbook ID %s', req.params.addressbookId)));
            return;
        }

        updateAddressbook(req.params.addressbookId, req.body).then(() => {
            res.json(addressbook);
        }, (err) => {
            res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete addressbook %s', err)));
        });
    }, (err) => {
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to update addressbook %s', err)));
    });
});


/**
 * get addressbook by id
 *
 * @return {Object} entry Details
 * @param addressbookId
 */
function getAddressbooks() {
    return new Promise(((resolve, reject) => {
        addressbooksCollection.find({}).toArray((error, list) => {
            console.log(error);
            if (error) {
                resolve(error);
            }
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


app.delete('/api/addressbooks/:addressbookId', (req, res, next) => {
    getAddressbookById(req.params.id).then((addressbook) => {
        if (addressbook == null) {
            res.status(404).json(utils.createErrorObject(151, util.format('Unknown addressbook ID %s', req.params.addressbookId)));
            return;
        }

        removeAddressbook(req.params.addressbookId).then(() => {
            res.sendStatus(204);
        }, (err) => {
            res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete addressbook %s', err)));
        });
    }, (err) => {
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete addressbook %s', err)));
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
 * get addressbook by id
 *
 * @return {Object} entry Details
 * @param addressbookId
 */
function getGroupById(groupId) {
    return new Promise(((resolve, reject) => {
        groupsCollection.find({_id: groupId}).toArray((error, list) => {
            list.forEach((part, index, theArray) => {
                theArray[index] = part; // eslint-disable-line no-param-reassign
            });
            resolve(list);
        });
    }));
}
/**
 * get addressbook by id
 *
 * @return {Object} entry Details
 * @param addressbookId
 */
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
/**
 * get addressbook by id
 *
 * @return {Object} entry Details
 * @param addressbookId
 */
function addGroup(newGroup) {
    // console.log(entry);
    return new Promise(((resolve, reject) => {

        var dbGroup = {};
        dbGroup.name = newGroup.name;

        groupsCollection.insert(dbGroup, (error, result) => {
            console.log(result);
            resolve(result);
        });
    }));
}


app.post('/api/groups/', validate({body: schema.GroupCreate}), (req, res) => {
    console.log(req.body);
    addGroup(req.body).then((group) => {
        //logger.debug(util.format('POST /calendar/%s/events - 200 - %j', req.userId, groupName));
        res.json(group);
    }, (err) => {
        //logger.debug(util.format('POST /calendar/%s/events - 500', req.userId));
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to create groupName %s', err)));
    });
});

app.get('/api/groups/:groupId', (req, res, next) => {
    getGroupById(req.params.groupId).then((group) => {
        res.json(group);
    }, (err) => {
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to get groupName %s', err)));
    });
});

/**
 * Update entry
 *
 * @param groupId entry ID
 * @param entry entry data
 * @return {Object} entry Details
 */
function updateGroup(groupId, group) {
    return new Promise(((resolve, reject) => {
        const query = {
            _id: groupId,
        };

        var updatedGroup = {};
        updatedGroup.name = group.name;

        groupsCollection.update(query, group, (error, item) => {
            if (error) {
                reject(error);
            }
            resolve(item);
        });
    }));
}

app.put('/api/groups/:groupId', validate({body: schema.GroupCreate}), (req, res, next) => {
    getGroupById(req.params.groupId).then((group) => {
        if (group == null) {
            res.status(404).json(utils.createErrorObject(151, util.format('Unknown groupName ID %s', req.params.groupId)));
            return;
        }

        updateGroup(req.params.groupId, req.body).then(() => {
            res.json(group);
        }, (err) => {
            res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete groupName %s', err)));
        });
    }, (err) => {
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to update groupName %s', err)));
    });
});
/**
 * get addressbook by id
 *
 * @return {Object} entry Details
 * @param addressbookId
 */
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
    getGroupById(req.params.groupId).then((group) => {
        if (group == null) {
            res.status(404).json(utils.createErrorObject(151, util.format('Unknown groupName ID %s', req.params.groupId)));
            return;
        }

        removeGroup(req.params.groupId).then(() => {
            res.sendStatus(204);
        }, (err) => {
            res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete groupName %s', err)));
        });
    }, (err) => {
        res.status(500).json(utils.createErrorObject(131, util.format('Failed to delete groupName %s', err)));
    });
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
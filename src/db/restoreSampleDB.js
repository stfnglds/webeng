const json = [
  {
    name: 'Hospital Book',
    groups: [
      {
        name: 'General Hospitals',
        entries: [
          {
            name: 'New York Central Hospital',
            email: 'nyhp@ny.com',
            address: '41th street',
            rating: 3,
          },
          {
            name: 'Saint Clara Hospital Washington',
            email: 'sch@wsh.com',
            address: 'main street 5',
            rating: 4,
          },
        ],
      },
      {
        name: 'Animal Hospitals',
        entries: [
          {
            name: 'Santa Barbara Animal Hospital',
            email: 'sb@hospitalbarbara.com',
            address: 'st. Barbara Street 5',
            rating: 3,
          },
        ],
      },
    ],
  },
];


const Engine = require('tingodb')();

const db = new Engine.Db('', {});

const collection = db.collection('database');
collection.insert(json);
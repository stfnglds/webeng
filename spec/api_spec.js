const request = require('request');
const api = require('../src/services/api.js');

// IMPORTANT: Stop API Node server before running gulp jasmine

// describe('API Tests', () => {
//     it('contains spec with an expectation', async () => {
//         let list = [];
//         await (function () {
//             list = api.getAllEntries();
//         });
//
//         expect(list.length).toBeGreaterThan(0);
//     });
// });


describe('GET', () => {
    it('entries', (done) => {
        request('http://localhost:3000/api/entries', (error, response, body) => {
            var obj = JSON.parse(body);
            expect(obj.length).toBeGreaterThan(0);
            done();
        });
    });
    it('entrie 1 has a name', (done) => {
        request('http://localhost:3000/api/entries', (error, response, body) => {
            var obj = JSON.parse(body);
            expect(obj[0].name).toBeDefined();
            done();
        });
    });
    it('groups', (done) => {
        request('http://localhost:3000/api/groups', (error, response, body) => {
            var obj = JSON.parse(body);
            expect(obj.length).toBeGreaterThan(0);
            done();
        });
    });
    it('addressbooks', (done) => {
        request('http://localhost:3000/api/addressbooks', (error, response, body) => {
            var obj = JSON.parse(body);
            expect(obj.length).toBeGreaterThan(0);
            done();
        });
    });
});

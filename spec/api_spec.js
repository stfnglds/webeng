const request = require('request');
const api = require('../src/services/api.js');

// IMPORTANT: Stop API Node server before running gulp jasmine

describe('GET', () => {
    it('entries', (done) => {
        request('http://localhost:3000/api/entries', (error, response, body) => {
            const obj = JSON.parse(body);
            expect(obj.length)
                .toBeGreaterThan(0);
            done();
        });
    });
    it('entrie 1 has a name', (done) => {
        request('http://localhost:3000/api/entries', (error, response, body) => {
            const obj = JSON.parse(body);
            expect(obj[0].name)
                .toBeDefined();
            done();
        });
    });
    it('groups', (done) => {
        request('http://localhost:3000/api/groups', (error, response, body) => {
            const obj = JSON.parse(body);
            expect(obj.length)
                .toBeGreaterThan(0);
            done();
        });
    });
    it('addressbooks', (done) => {
        request('http://localhost:3000/api/addressbooks', (error, response, body) => {
            const obj = JSON.parse(body);
            expect(obj.length)
                .toBeGreaterThan(0);
            done();
        });
    });
});

describe('Server Codes', () => {

    describe('Entries', () => {
        beforeEach(function () {
            url = 'http://localhost:3000/api/entries';
        });

        it('should return 200 on GET', function (done) {
            request.get(url, function (error, response) {
                expect(response.statusCode)
                    .toEqual(200);
                done();
            });
        });

        it('should fail on POST', function (done) {
            request.post(url, {
                json: true,
                body: {},
            }, function (error, response) {
                expect(response.statusCode)
                    .toEqual(500);
                done();
            });
        });

        it('should give 200 on POST', function (done) {
            request.post(url, {
                json: true,
                body: { name: 'test' },
            }, function (error, response) {
                expect(response.statusCode)
                    .toEqual(200);
                done();
            });
        });
    });

    describe('Groups', () => {
        beforeEach(function () {
            url = 'http://localhost:3000/api/groups';
        });

        it('should return 200 on GET', function (done) {
            request.get(url, function (error, response) {
                expect(response.statusCode)
                    .toEqual(200);
                done();
            });
        });

        it('should fail on POST', function (done) {
            request.post(url, {
                json: true,
                body: {},
            }, function (error, response) {
                expect(response.statusCode)
                    .toEqual(500);
                done();
            });
        });

        it('should give 200 on POST', function (done) {
            request.post(url, {
                json: true,
                body: { name: 'test' },
            }, function (error, response) {
                expect(response.statusCode)
                    .toEqual(200);
                done();
            });
        });
    });

    describe('Addressbooks', () => {
        beforeEach(function () {
            url = 'http://localhost:3000/api/addressbooks';
        });

        it('should return 200 on GET', function (done) {
            request.get(url, function (error, response) {
                expect(response.statusCode)
                    .toEqual(200);
                done();
            });
        });

        it('should fail on POST', function (done) {
            request.post(url, {
                json: true,
                body: {},
            }, function (error, response) {
                expect(response.statusCode)
                    .toEqual(500);
                done();
            });
        });

        it('should give 200 on POST', function (done) {
            request.post(url, {
                json: true,
                body: { name: 'test' },
            }, function (error, response) {
                expect(response.statusCode)
                    .toEqual(200);
                done();
            });
        });
    });
});



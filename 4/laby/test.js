//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
const fs = require('fs');

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

// UNIT test begin
describe('GET /submit?name=index.js', function () {
      it('respond with index.js content', function (done) {
            server
                  .get('/submit?name=index.js')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, "It is a file" + fs.readFileSync('index.js', 'utf8'), done);
      });
});

describe('GET /submit?name=test', function () {
    it('respond with index.js content', function (done) {
          server
                .get('/submit?name=test')
                .expect('Content-Type', /text\/plain/)
                .expect(200, "It is a directory.", done);
    });
});

describe('GET /submit?name=sadas', function () {
    it('respond with index.js content', function (done) {
          server
                .get('/submit?name=sadas')
                .expect('Content-Type', /text\/plain/)
                .expect(200, "It's nothing.", done);
    });
});
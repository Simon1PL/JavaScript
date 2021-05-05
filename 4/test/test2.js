var check = require('../index.js').check;
var fs = require('fs');
var assert = require('assert');

describe('The path reader', function() {
    it('Should return, that it is a directory', function() {
      assert.strictEqual(check("test"), "It is a directory.");
    });
    it('Should returns file contents', function() {
      assert.strictEqual(check("index.js"), "It is a file" + fs.readFileSync("index.js", 'utf8'));
    });
    it('Should return, that don\'t exists', function() {
      assert.strictEqual(check("nothing"), "It's nothing.");
    });
});
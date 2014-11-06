var express = require('express'),
  app = express(),
  chai = require('chai'),
  should = chai.should(),
  controller = require('../../api/digestController'),
  request = require('supertest'),
  validator = require('validator');

chai.config.includeStack = true;

controller.init(app);

postDigest = function(should) {
  request(app)
    .post('/api/digest', 'myfirstdigest')
    .end(should);
};

describe('digestController', function () {
  describe('when creating a digest', function () {
    it('digestUrl should be a valid URI', function(done) {
      postDigest(function (err, res) {
        validator.isURL(res.body.digestUrl).should.be.true;
        done();
      });
    });

    it('should have a valid uuid as an identifier', function(done) {
      postDigest(function (err, res) {
        var digestUrlParts = res.body.digestUrl.split('/');
        var id = digestUrlParts[digestUrlParts.length - 1];
        validator.isUUID(id).should.be.true;
        done();
      });
    });
  });
});


// {
//   "digestUrl": "http://host/api/digest/1f1aa47629c44116a3ca08a9bb911309",
//   "_links": [
//     {
//     "href": "http://host/api/digest/1f1aa47629c44116a3ca08a9bb911309/inbox/new",
//     "rel": "inbox",
//     "name": "Navigate to form for creating an inbox for a repository",
//     "method": "GET"
//     }
//   ]
// }

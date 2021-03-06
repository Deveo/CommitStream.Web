(function() {
  var _ = require('underscore');

  var helpers = {
    shouldBeGenericError: function(response) {
      JSON.parse(response.text).errors[0].should.equal('There was an internal error when trying to process your request.');
    },
    clone: function(source) {
      return JSON.parse(JSON.stringify(source));
    }
  };

  module.exports = function(target) {
    _.extend(target, helpers);
  };
}());
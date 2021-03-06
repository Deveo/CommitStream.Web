(function() {
  var EventStore = require('eventstore-client'),
    config = require('../../config'),
    _ = require('underscore'),
    statusCodeValidator = require('./statusCodeValidator');

  var client = new EventStore({
    baseUrl: config.eventStoreBaseUrl,
    username: config.eventStoreUser,
    password: config.eventStorePassword
  });

  client.queryStatePartitionById = function(args) {
    var partition = args.partition || args.name + '-' + args.id;
    var stateArgs = {
      name: args.name,
      partition: partition
    };

    return client.projection.getStateAsync(stateArgs)
      .then(statusCodeValidator.validateGetProjection(args.name, args.id));
  };

  client.postToStream = function(args) {
    // Stay immutable, bro
    var events = args.events;
    if (!_.isArray(events)) {
      events = [events];
    }
    events = JSON.stringify(events);

    var postArgs = {
      name: args.name,
      events: events
    };

    return client.streams.postAsync(postArgs)
      .then(statusCodeValidator.validateStreamsPost);
  };

  client.getFromStream = function(args) {
    var getArgs = _.pick(args, 'name', 'count', 'pageUrl', 'embed');

    return client.streams.getAsync(getArgs)
      .then(statusCodeValidator.validateGetStream(args.name));
  };

  client.queryCreate = function(args) {
    return client.query.postAsync(args)
      .then(statusCodeValidator.validateQueryCreate);
  };

  client.queryGetState = function(args) {
    return client.query.getStateAsync(args)
      .then(statusCodeValidator.validateQueryGetState);
  };

  client.queryGetStatus = function(args) {
    return client.query.getStatusAsync(args)
      .then(statusCodeValidator.validateQueryGetStatus);
  };

  module.exports = client;
})();

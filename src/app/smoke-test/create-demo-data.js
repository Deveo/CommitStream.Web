'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Map = require('babel-runtime/core-js/map')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _libCsApiClient = require('./lib/cs-api-client');

var _libCsApiClient2 = _interopRequireDefault(_libCsApiClient);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

_commander2['default'].version('0.0.0').option('-u, --url [url]', 'The base URL for the CommitStream Service API, default: http://localhost:6565/api', 'http://localhost:6565/api').option('-i, --instances [number]', 'Number of instances to create, default: 1', 1).option('-r, --repos [number]', 'Number of repos creation iterations to run (creates one repo per family type during each iteration), default 1', 1).option('-m, --mentions [number]', 'Number of times to post a commit with each mention (one story, 5 tasks, 5 tests in each group of workitems), default 1', 1).option('-d, --debug', 'Show results of each commit, not just summary information').option('-j, --json', 'Log only the JSON output with all the query URLs needed for the performance client').option('-s, --sample', 'Create the commits with sample data that exists in the PR builds', 0).parse(process.argv);

var number_of_instances = parseInt(_commander2['default'].instances);
var number_of_repo_iterations = parseInt(_commander2['default'].repos);
var number_of_mentions_per_workitem_per_repo = parseInt(_commander2['default'].mentions);

var client = new _libCsApiClient2['default'](_commander2['default'].url);

if (!_commander2['default'].json) console.log('Operating against this CommitStream Service API: ' + client.baseUrl);

var createInstanceAndDigest = function createInstanceAndDigest(iteration) {
  var instance, digest;
  return _regeneratorRuntime.async(function createInstanceAndDigest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(client.instanceCreate());

      case 2:
        instance = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(instance.digestCreate({
          description: 'Digest for ' + iteration
        }));

      case 5:
        digest = context$1$0.sent;

        if (!_commander2['default'].json) {
          console.log('The digest: ' + digest._links['teamroom-view'].href + '&apiKey=' + client.apiKey);
          console.log('#' + iteration + ': Populating instance ' + client.instanceId + ' (apiKey = ' + client.apiKey + ')');
        }

        return context$1$0.abrupt('return', {
          instance: instance, digest: digest
        });

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

var getRealMentions = function getRealMentions() {
  var realMentions = new _Map();
  realMentions.set('S-01041', ['AT-01075', 'AT-01076', 'AT-01077', 'AT-01085', 'TK-01078', 'TK-01079', 'TK-01080', 'TK-01098', 'TK-01100']);
  realMentions.set('S-01042', ['AT-01078', 'AT-01079', 'AT-01080', 'AT-01081', 'AT-01082', 'TK-01081', 'TK-01082', 'TK-01083', 'TK-01084']);
  realMentions.set('S-01043', ['AT-01083', 'AT-01084', 'AT-01086', 'AT-01087', 'TK-01086', 'TK-01087', 'TK-01088', 'TK-01089']);
  realMentions.set('S-01064', ['AT-01097', 'TK-01113', 'TK-01114']);
  return realMentions;
};

var createInboxesForSampleData = _regeneratorRuntime.mark(function createInboxesForSampleData(dto) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, inboxToCreate;

  return _regeneratorRuntime.async(function createInboxesForSampleData$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 3;
        _iterator = _getIterator(dto.inboxesToCreate);

      case 5:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 14;
          break;
        }

        inboxToCreate = _step.value;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(dto.digest.inboxCreate(inboxToCreate));

      case 9:
        context$1$0.next = 11;
        return context$1$0.sent;

      case 11:
        _iteratorNormalCompletion = true;
        context$1$0.next = 5;
        break;

      case 14:
        context$1$0.next = 20;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](3);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 20:
        context$1$0.prev = 20;
        context$1$0.prev = 21;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 23:
        context$1$0.prev = 23;

        if (!_didIteratorError) {
          context$1$0.next = 26;
          break;
        }

        throw _iteratorError;

      case 26:
        return context$1$0.finish(23);

      case 27:
        return context$1$0.finish(20);

      case 28:
      case 'end':
        return context$1$0.stop();
    }
  }, createInboxesForSampleData, this, [[3, 16, 20, 28], [21,, 23, 27]]);
});

// :'( https://github.com/zenparsing/async-iteration/
var getAsyncIteratorElement = function getAsyncIteratorElement(iterator) {
  var i;
  return _regeneratorRuntime.async(function getAsyncIteratorElement$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(iterator.next());

      case 2:
        i = context$1$0.sent;
        return context$1$0.abrupt('return', i);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

var createSampleCommits = function createSampleCommits(inboxesAsyncIterator) {
  var realMentions, inboxElement, _loop;

  return _regeneratorRuntime.async(function createSampleCommits$(context$1$0) {
    var _this4 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        realMentions = getRealMentions();
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(getAsyncIteratorElement(inboxesAsyncIterator));

      case 3:
        inboxElement = context$1$0.sent;

        _loop = function callee$1$0() {
          var inbox;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            var _this3 = this;

            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                inbox = inboxElement.value;

                realMentions.forEach(function callee$2$0(parentValue, parentKey) {
                  var message;
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    var _this2 = this;

                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        message = createMessage(parentKey, inbox);
                        context$3$0.next = 3;
                        return _regeneratorRuntime.awrap(createCommit(message, inbox));

                      case 3:
                        parentValue.forEach(function callee$3$0(childValue) {
                          var message;
                          return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                            while (1) switch (context$4$0.prev = context$4$0.next) {
                              case 0:
                                message = createMessage(parentKey + ' ' + childValue, inbox);
                                context$4$0.next = 3;
                                return _regeneratorRuntime.awrap(createCommit(message, inbox));

                              case 3:
                              case 'end':
                                return context$4$0.stop();
                            }
                          }, null, _this2);
                        });

                      case 4:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this3);
                });

                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(getAsyncIteratorElement(inboxesAsyncIterator));

              case 4:
                inboxElement = context$2$0.sent;

              case 5:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this4);
        };

      case 5:
        if (inboxElement.done) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_loop());

      case 8:
        context$1$0.next = 5;
        break;

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

var createMessage = function createMessage(mention, inbox) {
  return mention + ' in  ' + inbox.inboxId + ' of family = ' + inbox.family;
};

var createCommit = function createCommit(message, inbox) {
  var commitAddResponse;
  return _regeneratorRuntime.async(function createCommit$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(inbox.commitCreate(message));

      case 2:
        commitAddResponse = context$1$0.sent;

        if (_commander2['default'].debug) {
          console.log(commitAddResponse.message);
        }

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

var getInboxesToCreate = function getInboxesToCreate(dto) {
  var iteration, inboxesToCreate;
  return _regeneratorRuntime.async(function getInboxesToCreate$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        iteration = dto.iteration;
        inboxesToCreate = [{
          name: 'GitHub Repo ' + iteration,
          family: 'GitHub'
        }, {
          name: 'GitLab Repo ' + iteration,
          family: 'GitLab'
        }, {
          name: 'Bitbucket Repo ' + iteration,
          family: 'Bitbucket'
        }, {
          name: 'VsoGit Repo ' + iteration,
          family: 'VsoGit'
        }];

        dto.inboxesToCreate = inboxesToCreate;
        return context$1$0.abrupt('return', dto);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

var workItemsToMention = [['S-00001', 'T-00001', 'T-00002', 'T-00003', 'T-00004', 'T-00005', 'AT-00001', 'AT-00002', 'AT-00003', 'AT-00004', 'AT-00005'], ['S-00002', 'T-00011', 'T-00012', 'T-00013', 'T-00014', 'T-00015', 'AT-00011', 'AT-00012', 'AT-00013', 'AT-00014', 'AT-00015'], ['S-00003', 'T-00021', 'T-00022', 'T-00023', 'T-00024', 'T-00025', 'AT-00021', 'AT-00022', 'AT-00023', 'AT-00024', 'AT-00025'], ['S-00004', 'T-00031', 'T-00032', 'T-00033', 'T-00034', 'T-00035', 'AT-00031', 'AT-00032', 'AT-00033', 'AT-00034', 'AT-00035']];

var createInboxes = function createInboxes(dto) {
  var inboxNum, digest;
  return _regeneratorRuntime.async(function createInboxes$(context$1$0) {
    var _this7 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        inboxNum = 0;
        digest = dto.digest;

        _ramda2['default'].map(function callee$1$0(iteration) {
          var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop2, _iterator2, _step2, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3;

          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            var _this6 = this;

            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                context$2$0.prev = 3;

                _loop2 = function callee$2$0() {
                  var inboxToCreate, inbox, workItemsGroup, comma, _loop3;

                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    var _this5 = this;

                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        inboxToCreate = _step2.value;
                        context$3$0.next = 3;
                        return _regeneratorRuntime.awrap(digest.inboxCreate(inboxToCreate));

                      case 3:
                        inbox = context$3$0.sent;
                        workItemsGroup = workItemsToMention[inboxNum % 4];
                        comma = iteration === 0 && inboxNum === 0 ? '' : ',';

                        inboxNum++;
                        dto.inbox = inbox;
                        if (!_commander2['default'].json) {
                          console.log('Adding commits to ' + inbox.inboxId + ' of family ' + inbox.family);
                          console.log(inbox._links['add-commit'].href + '?apiKey=' + client.apiKey);
                        } else console.log(comma + '"' + client.baseUrl + '/' + client.instanceId + '/commits/tags/versionone/workitem?numbers=' + workItemsGroup.join(',') + '&apiKey=' + client.apiKey + '"');
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        context$3$0.prev = 12;

                        _loop3 = function () {
                          var workItem = _step3.value;

                          _ramda2['default'].map(function callee$4$0(mentionNum) {
                            var message;
                            return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
                              while (1) switch (context$5$0.prev = context$5$0.next) {
                                case 0:
                                  message = workItem + ' mention # ' + mentionNum + ' on ' + iteration + ' in  ' + inbox.inboxId + ' of family = ' + inbox.family;

                                  createCommit(message, inbox);

                                case 2:
                                case 'end':
                                  return context$5$0.stop();
                              }
                            }, null, _this5);
                          }, _ramda2['default'].range(0, number_of_mentions_per_workitem_per_repo));
                        };

                        for (_iterator3 = _getIterator(workItemsGroup); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                          _loop3();
                        }
                        context$3$0.next = 21;
                        break;

                      case 17:
                        context$3$0.prev = 17;
                        context$3$0.t0 = context$3$0['catch'](12);
                        _didIteratorError3 = true;
                        _iteratorError3 = context$3$0.t0;

                      case 21:
                        context$3$0.prev = 21;
                        context$3$0.prev = 22;

                        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                          _iterator3['return']();
                        }

                      case 24:
                        context$3$0.prev = 24;

                        if (!_didIteratorError3) {
                          context$3$0.next = 27;
                          break;
                        }

                        throw _iteratorError3;

                      case 27:
                        return context$3$0.finish(24);

                      case 28:
                        return context$3$0.finish(21);

                      case 29:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this6, [[12, 17, 21, 29], [22,, 24, 28]]);
                };

                _iterator2 = _getIterator(dto.inboxesToCreate);

              case 6:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  context$2$0.next = 12;
                  break;
                }

                context$2$0.next = 9;
                return _regeneratorRuntime.awrap(_loop2());

              case 9:
                _iteratorNormalCompletion2 = true;
                context$2$0.next = 6;
                break;

              case 12:
                context$2$0.next = 18;
                break;

              case 14:
                context$2$0.prev = 14;
                context$2$0.t0 = context$2$0['catch'](3);
                _didIteratorError2 = true;
                _iteratorError2 = context$2$0.t0;

              case 18:
                context$2$0.prev = 18;
                context$2$0.prev = 19;

                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                  _iterator2['return']();
                }

              case 21:
                context$2$0.prev = 21;

                if (!_didIteratorError2) {
                  context$2$0.next = 24;
                  break;
                }

                throw _iteratorError2;

              case 24:
                return context$2$0.finish(21);

              case 25:
                return context$2$0.finish(18);

              case 26:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this7, [[3, 14, 18, 26], [19,, 21, 25]]);
        }, _ramda2['default'].range(0, number_of_repo_iterations));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

var createInstanceWithSampleData = _ramda2['default'].pipeP(createInstanceAndDigest, getInboxesToCreate, createInboxesForSampleData, createSampleCommits);

var createInstanceWithFakeData = _ramda2['default'].pipeP(createInstanceAndDigest, getInboxesToCreate, createInboxes);

var run = function run() {
  var iteration;
  return _regeneratorRuntime.async(function run$(context$1$0) {
    var _this8 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (_commander2['default'].json) console.log('[');

        if (!_commander2['default'].sample) {
          context$1$0.next = 8;
          break;
        }

        console.log('Creating instance with sample data');
        iteration = new Date().toGMTString();
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(createInstanceWithSampleData(iteration));

      case 6:
        context$1$0.next = 10;
        break;

      case 8:
        console.log('Creating instance with fake data');
        try {
          _ramda2['default'].map(function callee$1$0(instanceNumber) {
            return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  context$2$0.next = 2;
                  return _regeneratorRuntime.awrap(createInstanceWithFakeData(instanceNumber));

                case 2:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, _this8);
          }, _ramda2['default'].range(0, number_of_instances));
        } catch (e) {
          // Review exception handling, it seems to be swallowing the errors
          console.log(e);
        }

      case 10:
        if (_commander2['default'].json) console.log(']');

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

try {
  run();
} catch (e) {
  console.log(e);
}

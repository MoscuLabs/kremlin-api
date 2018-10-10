'use strict';
var app = require('../../server/server');

module.exports = function(Neighborhood) {

  Neighborhood.greet = function(arg, cb) {
    var data = arg;
    console.log(arg);
    var item = {
			topics : [],
    }
    var Topic = app.models.Topic;
    Topic.findById(data.topicId, function (err, topic) {
			return cb(null, topic)
		})
  };
  Neighborhood.remoteMethod('greet', {
    accepts: {arg: 'data', type: 'object', required: true},
    returns: {result: true, type: 'object'},
  });

};
//5bb52f51a3f2cb062f49e701

'use strict';
var app = require('../../server/server');

module.exports = function(Neighborhood) {

  
  Neighborhood.greet = function(arg, cb) {
    var item = {
			topics : [],
    }
    var Topic = app.models.Neighbor;
    Topic.findById(arg, function (err, topic) {
			return cb(null, topic)
		})
  };

  Neighborhood.remoteMethod('greet', {
    accepts: {arg: 'userID', type: 'string'},
    returns: {root: true, type: 'object'},
  });


 Neighborhood.user_friends = function (idu,idn,callback) {
    var Neighbor = app.models.Neighbor;
    Neighbor.updateAll({id: idu},{neighborhood: idn}, function(err, item){

      return callback(null, item);
    });
 }

 Neighborhood.remoteMethod('user_friends', {
  accepts: [
    {
      arg: "idu",
      type: "string",
      required: true,
      description: "User Id"
    },
    {
      arg: "idn",
      type: "string",
      required: true,
      description: "Nei Id"
    }
  ],
  returns: [
    {
      root: true,
      type: "object"
    }
  ],
  http: [
    {
      path: "/addUser",
      verb: "post"
    }
  ]
});

};

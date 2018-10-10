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


 Neighborhood.user_friends = function (idu,callback) {
    var result =[
      "usuario1",
      "usuario2"
    ]

    var Neighbor = app.models.Neighbor;
    Neighbor.findById(idu, function (err, topic1) {
      return callback(null, topic1)
      
    })
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
      arg: "id",
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
      path: "/:id/addUser",
      verb: "get"
    }
  ]
});

};

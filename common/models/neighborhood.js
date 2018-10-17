'use strict';
var app = require('../../server/server');

module.exports = function(Neighborhood) {

  Neighborhood.greet = function(arg, cb) {
    var item = {
			topics : [],
    }
    var Topic = app.models.Topic;
    Topic.findById(arg, function (err, topic) {
			return cb(null, topic)
		})
  };
  Neighborhood.remoteMethod('greet', {
    accepts: {arg: 'userID', type: 'string'},
    returns: {root: true, type: 'object'},
  });

  Neighborhood.greet2 = function(arg, cb) {
    var Neighbor = app.models.Neighbor;
    Neighbor.find({where: {neighborhoodId: arg}}, function (err, topic) {
      console.log("greet2 ", topic);
			return cb(null, topic)
		})
  };
  Neighborhood.remoteMethod('greet2', {
    accepts: {arg: 'data', type: 'string'},
    returns: {result: 'topic', type: 'object'},
  });
  //where:{"neighborhood": arg}


 Neighborhood.user_friends = function (idu,idn,callback) {
    var Neighbor = app.models.Neighbor;
    Neighbor.updateAll({id: idu},{neighborhood: idn}, function(err, item){

      return callback(null, item);
    });
 }

 Neighborhood.remoteMethod('getRep', {
  accepts: [
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
      path: "/getRep",
      verb: "get"
    }
  ]
});


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
//5bb52f51a3f2cb062f49e701

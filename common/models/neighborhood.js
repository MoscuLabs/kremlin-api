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


 Neighborhood.addNeighbor = function (idu,idn,callback) {
    var Neighbor = app.models.Neighbor;
    Neighbor.updateAll({id: idu},{neighborhoodId: idn}, function(err, item){

      return callback(null, item);
    });
 }

 Neighborhood.getRep = function (idu,idn,callback) {
  var Neighbor = app.models.Neighbor;
  Neighbor.updateAll({id: idu},{neighborhoodId: idn}, function(err, item){

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


 Neighborhood.remoteMethod('addNeighbor', {
  accepts: [
    {
      arg: "neighborId",
      type: "string",
      required: true,
      description: "User Id"
    },
    {
      arg: "neighboorhoodId",
      type: "string",
      required: true,
      description: "neighboorhood Id"
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
      path: "/addNeighbor",
      verb: "post"
    }
  ]
});
};
//5bb52f51a3f2cb062f49e701

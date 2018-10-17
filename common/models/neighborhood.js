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


 Neighborhood.ceaseRepresentative = function (neighborId,callback) {
  var Neighbor = app.models.Neighbor;
  Neighbor.updateAll({id: neighborId},{representant: false}, function(err, item){
    return callback(null, item);
  });
}

 Neighborhood.remoteMethod('ceaseRepresentative', {
  accepts: [
    {
      arg: "neighborId",
      type: "string",
      required: true,
      description: "User Id"
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
      path: "/ceaseRepresentative",
      verb: "post"
    }
  ]
});


 Neighborhood.makeRepresentative = function (neighborId,callback) {
  var Neighbor = app.models.Neighbor;
  Neighbor.updateAll({id: neighborId},{representant: true}, function(err, item){
    return callback(null, item);
  });
}

 Neighborhood.remoteMethod('makeRepresentative', {
  accepts: [
    {
      arg: "neighborId",
      type: "string",
      required: true,
      description: "User Id"
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
      path: "/makeRepresentative",
      verb: "post"
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

'use strict';
var app = require('../../server/server');
var MethodoAcceptedButNotAllowed = 405;

module.exports = function(Neighborhood) {
  Neighborhood.addNeighbor = function (neigbhorId, neigbhorhoodId, cb) {
    var Neighbor = app.models.Neighbor;
    var Proposal = app.models.Proposal;
    Neighbor.findById(neigbhorId, function(err, neighbor){
      if (neighbor.neighborhoodId || (neighbor.neighborhoodId != null)) {
        var errorText = "Neighbor "+ neighbor.id +" is already in a Neighborhood"
        var error = new Error(errorText);
        error.status = MethodoAcceptedButNotAllowed;
        return cb(error);
      }
      else {
        Neighbor.updateAll({id: neigbhorId},{neighborhoodId: neigbhorhoodId}, function(err, res) {
          Neighbor.count({neighborhoodId: neigbhorhoodId}, function(err, countNeighbors) {
            Proposal.updateAll({neighborhoodId:neigbhorhoodId},{max_votes: countNeighbors}, function(err, proposals) {
              return cb(null, proposals);
            });
          });
        });
      }
    });
 };

  Neighborhood.remoteMethod('addNeighbor', {
    description: 'Add an instance of the model Neighbor from this Neighborhood.',
    accepts: [
      {
        arg: "fk",
        type: "string",
        required: true,
        description: "Neighbor Id",
        http: { source: 'path' }
      },
      {
        arg: "id",
        type: "string",
        required: true,
        description: "Neighboorhood Id",
        http: { source: 'path' }
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
        path: "/:id/addNeighbor/:fk",
        verb: "post"
      }
    ]
  });

  Neighborhood.kickNeighbor = function (neigbhorId, neigbhorhoodId, cb) {
    var Neighbor = app.models.Neighbor;
    var Proposal = app.models.Proposal;
    Neighbor.findById(neigbhorId, function(err, neighbor){
      if (!neighbor.neighborhoodId || (neighbor.neighborhoodId == null)) {
        var error = new Error("Neighbor doesn't belong to a Neighborhood");
        error.status = MethodoAcceptedButNotAllowed;
        return cb(error);
      }
      else {
        Neighbor.updateAll({id: neigbhorId},{neighborhoodId: null}, function(err, res) {
          Neighbor.count({neighborhoodId: neigbhorhoodId}, function(err, countNeighbors) {
            Proposal.updateAll({neighborhoodId:neigbhorhoodId},{max_votes: countNeighbors}, function(err, proposals) {
              return cb(null, proposals);
            });
          });
        });
      }
    });
 };

  Neighborhood.remoteMethod('kickNeighbor', {
    description: 'Take out an instance of the model Neighbor from this Neighborhood.',
    accepts: [
      {
        arg: "id",
        type: "string",
        required: true,
        description: "Neighboorhood Id",
        http: { source: 'path' }
      },
      {
        arg: "fk",
        type: "string",
        required: true,
        description: "Neighbor Id",
        http: { source: 'path' }
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
        path: "/:id/kickNeighbor/:fk",
        verb: "post"
      }
    ]
  });

  Neighborhood.makeRepresentative = function (neighborId,callback) {
    var Neighbor = app.models.Neighbor;
    Neighbor.updateAll({id: neighborId},{representant: true}, function(err, item) {
      return callback(null, item);
    });
  };

  Neighborhood.remoteMethod('makeRepresentative', {
    description: 'Make an instance of the model Neighbor representative.',
    accepts: [
      {
        arg: "fk",
        type: "string",
        required: true,
        description: "Neighbor Id",
        http: { source: 'path' }
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
        path: "/makeRepresentative/:fk",
        verb: "post"
      }
    ]
  });

  Neighborhood.ceaseRepresentative = function (neighborId,callback) {
    var Neighbor = app.models.Neighbor;
    Neighbor.updateAll({id: neighborId},{representant: false}, function(err, item) {
      return callback(null, item);
    });
  };

  Neighborhood.remoteMethod('ceaseRepresentative', {
    description: 'Cease an instance of the model Neighbor representative.',
    accepts: [
      {
        arg: "fk",
        type: "string",
        required: true,
        description: "Neighbor Id",
        http: { source: 'path' }
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
        path: "/ceaseRepresentative/:fk",
        verb: "post"
      }
    ]
  });
};

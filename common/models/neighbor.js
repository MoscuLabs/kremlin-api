'use strict';
var app = require('../../server/server');

module.exports = function(Neighbor) {

  Neighbor.vote = function(neighborId, proposalId , callback) {
    var Vote = app.models.Vote;
    var Proposal = app.models.Proposal;
    Vote.find({where:{proposalId:proposalId, neighborId:neighborId}},function(err,topic1) {
      if (topic1.length == []) {
        Vote.create({proposalId:proposalId, neighborId:neighborId},function(err,topic2){
          Proposal.find({where: {id:proposalId}}, function (err, proposal) {
            var proposalToVote = JSON.stringify(proposal[0]);
            var objectValue = JSON.parse(proposalToVote).current_votes;
            var numberOfVotes = parseInt(objectValue + 1);
              Proposal.updateAll({id: proposalId},{current_votes: numberOfVotes}, function(err, item) {
                return callback(null, item);
              });
          });
        });
      } else {
        var errorText = "Neighbor "+ neighborId +" has already vote for proposal" + proposalId;
        var error = new Error(errorText);
        error.status = 405;
        return callback(error);
      }
    });
  };

  Neighbor.remoteMethod('vote', {
    accepts: [
      {
        arg: "neighborId",
        type: "string",
        required: true,
        description: "Neighbor Id"
      },
      {
        arg: "proposalId",
        type: "string",
        required: true,
        description: "Proposal Id"
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
        path: "/vote",
        verb: "post"
      }
    ]
  });


  Neighbor.request = function(id, fk , callback) {

  };




  Neighbor.remoteMethod('request', {
    accepts: [
      {
        arg: "id",
        type: "string",
        required: true,
        description: "Neighbor Id",
        http: { source: 'path' }
      },
      {
        arg: "fk",
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
        path: "/:id/request/:fk",
        verb: "post"
      }
    ]
  });

};

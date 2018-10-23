'use strict';
var app = require('../../server/server');

module.exports = function(Neighbor) {

    Neighbor.vote = function(neighbor, proposal, cb) {
        //var Proposals = app.models.Proposal;
        var Vote = app.models.Vote;
        Vote.find({where:{proposalId:proposal, neighborId:neighbor}}, function(err,votes) {
          console.log("Votes: ", votes);
          if (votes.length > 1) {
            return
          }
          else {
            Vote.create
          }
          return cb(null, votes)
        })
      };

      Neighbor.remoteMethod('vote', {
        accepts: [
          {
            arg: "neighborId",
            type: "string",
            required: true,
            description: "User Id"
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
};

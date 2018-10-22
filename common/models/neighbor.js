'use strict';
var app = require('../../server/server');

module.exports = function(Neighbor) {

    Neighbor.voteForProposal = function(neigId,ProposId,neighborhoodId ,cb) {
        //var Neighborvar = app.models.Neighbor;
        //var Proposals = app.models.Proposal;
        var votes = app.models.Vote;
        votes.find({where:{proposalId:ProposId, neighborId:neigId}},function(err,topic1){
          return cb(null, topic1)
        })
      };

      Neighbor.remoteMethod('voteForProposal', {
        accepts: [
          {
            arg: "neighborId",
            type: "string",
            required: true,
            description: "User Id"
          },
          {
            arg: "ProposalId",
            type: "string",
            required: true,
            description: "Proposal Id"
          },
          {
            arg: "neighborhoodId",
            type: "string",
            required: true,
            description: "neighborhood Id"
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
            path: "/voteForProposal",
            verb: "post"
          }
        ]
      });
};

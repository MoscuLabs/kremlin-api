'use strict';
var app = require('../../server/server');

module.exports = function(Neighbor) {

    Neighbor.vote = function(neigId,ProposId ,cb) {
        var votes = app.models.Vote;
        votes.find({where:{proposalId:ProposId, neighborId:neigId}},function(err,topic1){

          if(topic1.length==[]){

            votes.create({proposalId:ProposId, neighborId:neigId},function(err,topic2){
              return cb(err, topic2)
            })
          }else{
            return cb("ya votaste por esta propuesta")
          }

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

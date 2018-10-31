'use strict';
var app = require('../../server/server');

module.exports = function(Neighbor) {

    Neighbor.vote = function(neigId,ProposId ,cb) {
        var votes = app.models.Vote;
        var proposal = app.models.Proposal;
        votes.find({where:{proposalId:ProposId, neighborId:neigId}},function(err,topic1){

          if(topic1.length==[]){

            votes.create({proposalId:ProposId, neighborId:neigId},function(err,topic2){
              proposal.find({where: {id:ProposId}}, function (err, info) {
                var string = JSON.stringify(info[0]);
                var objectValue = JSON.parse(string).current_votes;
                var Numberofvote = parseInt(objectValue + 1);
                  proposal.updateAll({id: ProposId},{current_votes: Numberofvote}, function(err, item){
                    return cb(null, item);
                  });
              });
            });

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

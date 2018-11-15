'use strict';
var app = require('../../server/server');
var MethodoAcceptedButNotAllowed = 405;

module.exports = function(Neighbor) {
  Neighbor.vote = function(neighborId, proposalId ,comment, option, callback) {
    var Vote = app.models.Vote;
    var Proposal = app.models.Proposal;
    Vote.find({where:{proposalId:proposalId, neighborId:neighborId}},function(err,topic1) {
      if (topic1.length == []) {
        Vote.create({proposalId:proposalId, neighborId:neighborId, Option:option, Comment:comment},function(err,topic2){
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
        error.status = MethodoAcceptedButNotAllowed;
        return callback(error);
      }
    });
  };

  Neighbor.remoteMethod('vote', {
    accepts: [
      {
        arg: "id",
        type: "string",
        required: true,
        description: "Neighbor Id",
        http: { source: 'path' }
      },
      {
        arg: "proposalId",
        type: "string",
        required: true,
        description: "Proposal Id"
      },
      {
        arg: "Option",
        type: "number",
        required: true,
        description: "Vote"
      },
      {
        arg: "Comment",
        type: "string",
        description: "if null why"
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
        path: "/:id/vote",
        verb: "post"
      }
    ]
  });

  Neighbor.cancelRequest = function (id,callback) {
    var Request = app.models.Request;
    Request.updateAll({neighborId: id},{status: false}, function(err, item) {
      return callback(null, item);
    });
  };

  Neighbor.remoteMethod('cancelRequest', {
    accepts: [
      {
        arg: "id",
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
        path: "/:id/cancelRequest",
        verb: "post"
      }
    ]
  });

  Neighbor.request = function(id, fk , comment ,callback) {
    var Request = app.models.Request;
    Request.find({where: {neighborId:id}}, function(err, item) {
      if(item.length == []){
        Request.create({message: comment, neighborId: id, neighborhoodId: fk, status:true},function(err, item2){
          return callback(null,item2);
        });
      }else{
        Request.find({where: {neighborId:id, status:false}}, function(err, item3){
          if(item3.length == []){
            var errorText = "You already have a request created "+ id;
            var error = new Error(errorText);
            error.status = MethodoAcceptedButNotAllowed;
            return callback(error);
          }else{
            Request.updateAll({id:item3[0].id},{status:true, neighborhoodId: fk, message: comment},function(err, item4){
              return callback(null,item4);
            });
          }
        });
      }
    });
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
      },
      {
        arg: "comment",
        type: "string",
        description: "Comment",
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

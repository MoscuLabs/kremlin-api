'use strict';
var app = require('../../server/server');

module.exports = function(Proposal) {

    Proposal.unvote = function(id, fk , Categoryfk ,callback) {
        var Votes = app.models.Vote;
        var datos = [];
        Votes.find({where: {neighborId:id}}, function(err, item) {
            Proposal.find({where: {neighborhoodId:fk}}, function(err, item2) {
                var countVoto = Object.keys(item).length;
                var countPropuestas = Object.keys(item2).length;
                var contador = 0;

                for(var i=0;i<countPropuestas;i++){
                    for(var j=0;j<countVoto;j++){
                        var a = String(item2[i].id);
                        var b = String(item[j].proposalId);
                        if(a != b){
                            contador++;
                            console.log("!= "+item2[i].id+" "+item[j].proposalId);
                        }else{
                            console.log("=="+item2[i].id+" "+item[j].proposalId);
                        }
                    }
                    console.log(contador+" "+countVoto);
                    if(contador == countVoto){
                        if(item2[i].categoryId == Categoryfk){
                            datos.push(item2[i]);
                        }
                    }
                    contador=0;
                }
                return callback(null, datos);
            });
        });
      };


    Proposal.remoteMethod('unvote', {
        description: 'Create an invitational request of this Neighbor to an specific Neighborhood.',
        accepts: [
          {
            arg: "id",
            type: "string",
            required: true,
            description: "Neighbor Id"
          },
          {
            arg: "fk",
            type: "string",
            required: true,
            description: "Neighboorhood Id"
          },
          {
            arg: "Categoryfk",
            type: "string",
            required: true,
            description: "Category Id",
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
            path: "/toVote",
            verb: "get"
          }
        ]
      });

};

'use strict';
var app = require('../../server/server');

module.exports = function(Neighbor) {

    Neighbor.make_rep = function(idu, cb) {
        var Neighborvar = app.models.Neighbor;
        Neighborvar.updateAll({id: idu},{representant: "yes"}, function(err, item){

            return cb(null, item);
          });
      };

      Neighbor.remoteMethod('make_rep', {
        accepts: [
          {
            arg: "idu",
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
            path: "/makeRep",
            verb: "post"
          }
        ]
      });
};

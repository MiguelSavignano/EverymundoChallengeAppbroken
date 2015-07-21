var Movies   = require('../models/movies.server.model.js');
var ObjectId = require('mongoose').Types.ObjectId;

var moviesCtrl = {
  one: function(req, res) {
    var query = {_id: ObjectId(req.params.id)};

    Movies
    .findOne(query)
    .exec(function(err, movie){
      if(err) {
        return res.status(500).json({err: true, msg: err});
      }

      if(!movie) {
        return res.status(404).json({err: true, msg: 'Movie Not Found'});
      }

      res.json(movie);
    });
  },
  all: function(req, res) {

    Movies
    .find()
    .limit(10)
    .exec(function(err, results){
      if(err) {
        return res.status(500).json({err: true, msg: err});
      }

      if(!results.length) {
        return res.status(404).json({err: true, msg: 'Not Found'});
      }

      res.json(results);
    });
  },
  create: function(req, res) {
    Movies
    .create(req.body, function(err, movie){
      if(err)
        return res.status(500).json({error: true, msg: err});

      res.status(201).json(movie);
    });
  },
  update: function(req, res) {
    var query       = {_id: ObjectId(req.params.id)};
    var movieFields = req.body;
    var options     = {};

    Movies
    .update(query, {$set:movieFields}, options, function(err, numAffected){
      if(err)
        return res.status(500).json({error: true, msg: err, query: query});

      if(numAffected && !numAffected.ok)
        return res.status(404).json({error: true, msg:'Lead not found', query: query, numAffected: numAffected, movieFields: movieFields});

      res.status(202).json({query:query});
    });
  },
  delete: function(req, res) {
    var query  = {_id: ObjectId(req.params.id)};
    Movies
    .remove(query, function(err, response){
      if(err)
        return res.status(500).json({error: true, msg: err, query: query});

      var numAffected = response.result;
      if(numAffected && !numAffected.n)
        return res.status(404).json({error: true, msg:'Lead not found', query: query, numAffected: numAffected});

      res.status(202).json({query:query});
    });
  }
};

module.exports = moviesCtrl;
return;
exports.lead = function(req, res) {
    var id = req.params['id'];

    Leads.find({_id: id})
    .select('-email -phone -raw -buyers')
    .limit(1)
    .exec(function(err, results){
      if(err) {
        logr.error(err);
        return res.status(500).json({err: true, msg: err});
      }

      if(!results.length) {
        logr.error('Lead {"_id": "%s"} not found', id);
        return res.status(404).json({err: true, msg: 'Not Found'});
      }

      var lead = results.shift().toObject();

      if(lead.portal_id != req.user.portal_id) {
        logr.error('User from portal %d trying to see lead {"_id": "%s"} from portal %d', lead._id, req.user.portal_id, lead.portal_id);
        return res.status(401).json({err: true, msg: 'Access Denied'});
      }

      delete lead.portal_id;

      if(lead.fav) {
        lead.favorite = (lead.fav.indexOf(req.user._id) > -1) || undefined;
        delete lead.fav;
        lead.user = req.user._id;
      }

      res.json(lead);
    });
};

exports.lead_contact_info = function(req, res) {
    var id   = req.params['id'],
        user = req.user;

    // find is faster than findOne
    Leads.find({_id: id, portal_id: user.portal_id, location: {$in: user.client.location}})
        .select('email phone client category providers.id')
        .limit(1)
        .exec(function(err, results){

          if(results.length === 0)
            return res.status(404).json(jsonAnswer({}, 'not-found'));

          var lead = results.shift();
          buy.lead(user.client, lead).
          then(function(lead){
            res.json({
              _id:   lead._id,
              email: lead.email,
              phone: lead.phone
            });
          }).
          catch(function(err){
            var statusCode = err && err.status || 500;
            err.msg = translate(err.code, req.acceptsLanguages.apply(req, config.acceptsLanguages));
            logr.error('buy.lead catch', err);
            return res.status(statusCode).json(jsonAnswer(err));
          });
        });
};

exports.save_as_favorite = function(req, res) {
  var user = req.user;
  // logr.info({METHOD:'save_as_favorite',
  //              USER: req.user.first_name,
  //              TOKEN: req.token,
  //              PARAMS: req.params,
  //              BODY: req.body
  //             });
  var where   = {_id: req.params.id},
      fav     = {fav: user.id},
      update  = req.params.remove ? {$pull: fav} : {$addToSet: fav},
      options = {};
logr.info(update);
  Leads
    .update(where, update, options, function(err, numAffected){
      if(err)
        return res.status(500).json(jsonErrorAnswer(err));

      if(!numAffected)
        return res.status(404).json(jsonErrorAnswer('Lead not found'));
      // User.update({_id: user._id}, {$set:{client: client}})
      res.status(201).json(jsonAnswer());
    });
};

exports.remove_favorite = function(req, res) {
  var user = req.user;
  var where   = {_id: req.params.id},
      fav     = {fav: user.id},
      update  = req.remove ? {$pull: fav} : {$addToSet: fav},
      options = {};

  Leads
    .update(where, update, options, function(err, numAffected){
      if(err)
        return res.status(500).json(jsonErrorAnswer(err));

      if(!numAffected)
        return res.status(404).json(jsonErrorAnswer('Lead not found'));
      // User.update({_id: user._id}, {$set:{client: client}})
      res.status(201).json(jsonAnswer());
    });
};

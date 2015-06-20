'use strict';



var _ = require('lodash');
var Link = require('./link.model');
var Board = require('../board/board.model');
var User = require('../user/user.model');
var request = require('request');
var beagle = require('beagle');


// Get list of links
exports.index = function(req, res) {
  Link.find(function (err, links) {
    if(err) { return handleError(res, err); }
    return res.json(200, links);
  });
};

// Get a single link
exports.show = function(req, res) {
  Link.findById(req.params.id, function (err, link) {
    if(err) { return handleError(res, err); }
    if(!link) { return res.send(404); }
    return res.json(link);
  });
};

exports.getMany = function(req, res) {
  Link.find({'_id': { $in: JSON.parse(req.params.ids)} }, function(err, links){
      if(err) { return handleError(res, err); }
      if(!links) { return res.send(404); }
      return res.json(links);
  });
};

// Creates a new link in the DB.
exports.create = function(req, res) {
  request('https://api.embed.ly/1/extract?key='+process.env.EMBEDLY_API_KEY+'&url=' + encodeURIComponent(req.body.url), function (err, response, body) {
    if (err) { return handleError(res, err); }
    if (!err && response.statusCode == 200) { 
      body = JSON.parse(body)
      if (body) {
        if (body.title) {req.body.title = body.title; }
        if (body.provider_url) {req.body.providerUrl = body.provider_url; }
        if (body.provider_display) {req.body.providerDisplay = body.provider_display; }
        if (body.provider_name) {req.body.providerName = body.provider_name; }
        if (body.favicon_url) {req.body.favicon = body.favicon_url; }
        if (body.favicon_colors) {req.body.faviconColors = body.favicon_colors; }
        if (body.description) {req.body.description = body.description; }
        if (body.lead) {req.body.lead = body.lead; }
        if (body.content) {req.body.content = body.content; }
        if (body.type) {req.body.type = body.type; }
        if (body.keywords) {req.body.keywords = body.keywords; }
        if (body.entities) {req.body.entities = body.entities; }
        if (body.images) {req.body.images = body.images; }
        if (body.provider_url) {req.body.providerUrl = body.provider_url; }

        var smallColor = 750;
        var firstColor = {color:[0,0,0]}
        if (req.body.faviconColors) {
          req.body.faviconColors.forEach(function(elem){
          var color = elem.color[0] + elem.color[1] +elem.color[2];
          if (color <= smallColor && color > 10) {
            smallColor = elem.color[0] + elem.color[1] +elem.color[2];
            firstColor = elem;
          }
        });
        req.body.faviconColors.unshift(firstColor);
        }
        
      }
    }
    
    var newLink;
    Link.create(req.body)
    .then(function(link){
      newLink = link;
      return newLink; 
    })
    .then(function(newLink){
      return Board.findById(req.body.boardId).exec();
    })
    .then(function(board){
      board.links.push(newLink._id);
      board.markModified('links');
      board.__v++;
      return board.save();
    })
    .then(function(board){
      return User.findById(req.user._id).exec()
    })
    .then(function(user){
      user.links.push(newLink._id)
      return user.save()
    })
    .then(function(user){
      res.json(200, newLink);
    })
    .then(null, function(err){
      if(err) { return handleError(res, err); }
    })

  })

};

// Updates an existing link in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Link.findById(req.params.id, function (err, link) {
    if (err) { return handleError(res, err); }
    if(!link) { return res.send(404); }
    var updated = _.merge(link, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, link);
    });
  });
};

// Deletes a link from the DB.
exports.destroy = function(req, res) {
  Link.findById(req.params.id, function (err, link) {
    if(err) { return handleError(res, err); }
    if(!link) { return res.send(404); }
    link.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}
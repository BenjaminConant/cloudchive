'use strict';



var _ = require('lodash');
var Link = require('./link.model');
var Board = require('../board/board.model');
var request = require('request');


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

// Creates a new link in the DB.
exports.create = function(req, res) {
  console.log(process.env.EMBEDLY_API_KEY);
  request('https://api.embed.ly/1/extract?key=af2aa0f67757494eafa66fd08467f10f&url=http%3A%2F%2Fvimeo.com%2F18150336', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage.
    }
  })

  var newLink;
  Link.create({url: req.body.url})
  .then(function(link){
    newLink = link;
    return newLink; 
  })
  .then(function(newLink){
    return Board.findById(req.body.boardId).exec();
  })
  .then(function(board){
    board.links.push(newLink._id);
    return board.save()
  })
  .then(function(board){
    res.json(200, newLink);
  })
  .then(null, function(err){
    if(err) { return handleError(res, err); }
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
  return res.send(500, err);
}
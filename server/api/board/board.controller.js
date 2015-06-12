'use strict';

var _ = require('lodash');
var Board = require('./board.model');
var Helpers = require('../../components/helpers/helpers');
var User = require('../user/user.model');

// Get list of boards
exports.index = function(req, res) {
  Board.find(function (err, boards) {
    if(err) { return handleError(res, err); }
    return res.json(200, boards);
  });
};

// Get a single board
exports.show = function(req, res) {
  Board.findById(req.params.id)
  .deepPopulate('links.comments.author comments authors')
  .exec()
  .then(function(board) {
    res.json(200, board);
  })
  .then(null, function(err){
    if(err) { return handleError(res, err); }
  })
};


exports.getByUser = function (req, res) {
  User.findById(req.params.userId)
  .deepPopulate('boards.links.comments.author boards.comments boards.authors')
  .exec()
  .then(function(user){
    res.json(200, user.boards)
  })
  .then(null, function(err) {
    if(err) { return handleError(res, err); }
  })
}


// Creates a new board in the DB.
exports.create = function(req, res) {
  var newBoard;
  req.body.authors = [req.user._id];
  Board.create(req.body)
  .then(function(board){
    newBoard = board;
    return User.findById(req.user._id).exec()
  })
  .then(function(user){
    user.boards.push(newBoard._id)
    return user.save(function(err, user){
      res.json(200, newBoard);
    })
  })
  .then(null, function(err){
     if(err) { return handleError(res, err); }
  })

};

// Updates an existing board in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  
  req.body = Helpers.clean(req.body);

  Board.findById(req.params.id, function (err, board) {
    if (err) { return handleError(res, err); }
    if(!board) { return res.send(404); }
    var updated = _.merge(board, req.body);
    console.log(updated);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, board);
    });
  });
};

// Deletes a board from the DB.
exports.destroy = function(req, res) {
  Board.findById(req.params.id, function (err, board) {
    if(err) { return handleError(res, err); }
    if(!board) { return res.send(404); }
    board.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}
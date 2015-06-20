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
    updated.links = req.body.links;
    console.log("updated", updated);
    updated.markModified('links');
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, board);
    });
  });
};

exports.updateMeta = function (req, res) {
  Board.findById(req.params.id, function(err, board){
    if (err) { return handleError(res, err); }
    if(!board) { return res.send(404); }
    console.log("req.body", req.body);
    board.title = req.body.title;
    board.description = req.body.description;
    console.log("board", board);
    board.save(function(err){
      console.log("board", board);
      if (err) { return handleError(res, err); }
      return res.json(200, {title: board.title, description: board.description});
    });
  });
}

// Deletes a board from the DB.
exports.destroy = function(req, res) {
  Board.findById(req.params.id).exec()
  .then(function(board) {
    return board.remove();
  })
  .then(function(board){
    return User.findById(req.user._id).exec()
  })
  .then(function(user){
    console.log("before helper", user.boards, "boardId", req.params.id);
    Helpers.removeMatch(user.boards, req.params.id);
    console.log("after helper", user.boards);
    return user.save();
  })
  .then(function(user){
    console.log("the saved user", user);
    res.send(204);
  })
  .then(null, function(err){
    if(err) { return handleError(res, err); }
  });

};

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}
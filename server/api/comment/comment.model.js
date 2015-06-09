'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
	author: {type: Schema.Types.ObjectId, ref: 'User'},
	createdOn: Date,
	targetBoard: {type: Schema.Types.ObjectId, ref: 'Board'},
	targetLink: {type: Schema.Types.ObjectId, ref: 'Board'},
	targetAuthor: {type: Schema.Types.ObjectId, ref: 'Board'}
});

module.exports = mongoose.model('Comment', CommentSchema);
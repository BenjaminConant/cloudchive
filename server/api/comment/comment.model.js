'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
	text: {type: String, required: true},
	author: {type: Schema.Types.ObjectId, ref: 'User'},
	createdOn: {type: Date, default: Date.now()},
	targetBoard: {type: Schema.Types.ObjectId, ref: 'Board'},
	targetLink: {type: Schema.Types.ObjectId, ref: 'Link'},
	targetAuthors: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Comment', CommentSchema);
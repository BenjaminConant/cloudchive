'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate');

var BoardSchema = new Schema({
  title: {type: String, default: "My New Board"},
  description: {type: String, default: "My New Board's Description"},
  authors: [{type: Schema.Types.ObjectId, ref: 'User'}],
  createdOn: {type: Date, default: Date.now()},
  lastEdit: Date,
  links: [{type: Schema.Types.ObjectId, ref: 'Link'}],
  published: Boolean, 
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  stars: {type: Number, default:0}
});

BoardSchema.plugin(deepPopulate);

module.exports = mongoose.model('Board', BoardSchema);
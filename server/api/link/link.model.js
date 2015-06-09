'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LinkSchema = new Schema({
  url: String,
  providerUrl: String,
  favicon: String,
  title: String,
  description: String,
  type: String,
  thumbnails: [String],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Link', LinkSchema);
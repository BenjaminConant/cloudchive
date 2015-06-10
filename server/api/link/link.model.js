'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LinkSchema = new Schema({
  url: String,
  title: String,
  providerUrl: String,
  providerDisplay: String,
  providerName: String,
  favicon: String,
  faviconColors: Array,
  description: String,
  lead: String, 
  content: String,
  type: String,
  keywords: Array,
  entities: Array,
  images: Array,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  board: [{type: Schema.Types.ObjectId, ref: 'Board'}]
});

module.exports = mongoose.model('Link', LinkSchema);
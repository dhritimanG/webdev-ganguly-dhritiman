var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
  developerId:{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
  name: String,
  description: String,
  dateCreated: {type: Date,default: Date.now()},
  pages:[{type:mongoose.Schema.Types.ObjectId, ref:'PageModel'}]
},{collection: "website"});

module.exports = websiteSchema;

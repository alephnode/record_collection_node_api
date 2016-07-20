var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordModel = new Schema({
    title: {
      type: String
    },
    artist: {type: String},
    genre: {type: String},
    label: {type: String},
    rating: {type: String}
});
module.exports = mongoose.model('Record', recordModel);

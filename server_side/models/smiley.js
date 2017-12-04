/**
 * Created by Pravin on 12/04/17.
 */

var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: {type : String},
    mood : {type : String}
})

module.exports = mongoose.model('smiley',schema);

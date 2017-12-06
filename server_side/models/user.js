/**
 * Created by Pravin on 12/04/17.
 */

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firstName: {type : String, required: true},
    lastName: {type : String},
    password : {type : String},
    signUp : Date,
    email : {type : String, required: true}, 
    isverified : {type: Boolean, default:false},
    verificationCode: {type: Number},
    loginfrom : {type: String, default:'email', enum : ['email','facebook','google']},
    userStatus : {type: String, default:'active', enum : ['active','pending','blocked']},
    userType : [{type: String, default:'user', enum : ['admin','owner','user']}]
})

module.exports = mongoose.model('user',schema);

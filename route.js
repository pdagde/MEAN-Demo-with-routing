/**
 * Created by Pravin on 12/04/17.
 */

'use strict';

var auth = require("./server_side/controller/api/auth/auth.js");


module.exports.register = function(router){

 router.route('/auth/signUp').post(auth.signUp);
 router.route('/auth/verifiemailcode').post(auth.verifiemailcode);
router.route('/auth/resendCode').post(auth.resendCode);
router.route('/auth/login').post(auth.login);



  console.log('routes registered..!');
};


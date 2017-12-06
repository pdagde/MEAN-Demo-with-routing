/**
 * Created by Pravin on 12/04/17.
 */
var user = require('../../../models/user');
var bcrypt = require('bcrypt');
var mail = require("../../mail/mail");


function signUp(req,res){

    user.find({"email": req.body.email},function (err, data) {
     
    
     
     if(data[0]){
        res.json({"error":"user is alredy exist ! please try anather email"}); 
     }else{

       var newUser = new user();
    newUser.firstName = req.body.fullname.split(' ').slice(0, -1).join(' ');
    newUser.lastName = req.body.fullname.split(' ').slice(-1).join(' ');
    var password = req.body.password;
    // var hash = bcrypt.hashSync(password , 10);
    newUser.password = password;
    newUser.signUp =  new Date();
    newUser.userType ="admin";
    newUser.email = req.body.email;
    newUser.verificationCode = Math.floor(Math.random()*90000) + 10000;
    newUser.loginfrom = 'email';
    newUser.save(function (err, savedUser) {
        if(err){
               res.json({"error":err});   
        }else{
               mail.sendverificationCode(newUser);
               res.json({"ok":"saved"});
           }
    });

     }

    // 
});      
};


function verifiemailcode(req,res){
 
    user.find({"email": req.body.email,"verificationCode": req.body.code},function (err, data) {
         
         if(data[0]){
                  user.update({"email": req.body.email,"verificationCode": req.body.code},{$set:{"isverified":true}},function(err, result){
                    if(err){
                        res.json({"error":"some internal errorr happed please resend the code"});
                    }else{
                       user.find({"email": req.body.email,"verificationCode": req.body.code},{"password":0},function (err, responce) {
                          res.json(responce);
                       })   
                    }
                     
                  })
         }else{
            res.json({"error":"verification code combination is not match ! please resend the code"});
         }
    }); 
     // res.json({"ok":"saved"});
}


function resendCode(req,res){
 
 var query = {
        email:req.body.email,
        verificationCode:Math.floor(Math.random()*90000) + 10000
     }

   user.update({"email":req.body.email},{$set:{"verificationCode":query.verificationCode}},function(err,responce){
       if(err){
                 res.json({"error":"some internal errorr happed please resend the code"});
       }else{
         mail.sendverificationCode(query);
           res.json({"sucess":"mail succesfully send"});
       }
   })
}


function login(req,res){
     user.find({"email": req.body.email,"password":req.body.password},function (err, responce) {
                if(!responce[0]){
                  res.json({"error":" user and password combination is not match"});
                }else{
                  res.json(responce);
                }             
          })
}



module.exports.signUp = signUp;
module.exports.verifiemailcode = verifiemailcode;
module.exports.resendCode = resendCode;
module.exports.login = login;


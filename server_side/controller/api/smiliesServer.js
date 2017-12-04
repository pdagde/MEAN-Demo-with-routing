/**
 * Created by Pravin on 12/04/17.
 */


var smiley = require('../../models/smiley');
// var smiley_data = require('../../../DATA/smiley_data');

function createSmiley(req,res){
    var oneSmiley ={
        name:'pravin',
        mood : 'pravin'
    };
console.log("comeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    if(1){
        smiley.create(oneSmiley,function(err,result){
            console.log("resulttttttttttttttts",JSON.stringify);
            res.json(result);
        });
    }else{
        res.json('Bad Request');
    }

};

function deleteData() {
    smiley.remove({},function(err,result){
        // console.log('after delete  api',result)
    });
}

/*function registorData() {
    smiley.create(smiley_data,function(err,result){
        // console.log('after  api',result)
    });
}*/


function getSmiley(req,res){
    console.log("xxxxxx",JSON.stringify(req.body));
    var query = {};

    if(req.body.name){
        query.name=req.body.name;
      }
    console.log("query",JSON.stringify(query));
    var selection = {_id : 0};
    smiley.find(query,selection,function(err,result){
        res.json(result);
    });

};


// module.exports.registorData = registorData;
module.exports.createNewSmiley = createSmiley;
module.exports.getSmiley = getSmiley;
module.exports.deleteData = deleteData;
const testAppModel = require('../models/test-app.models')

exports.getData = function(req, res) {
    console.log("came to get fata")
    res.send({msg: 'get data is working'});
    // testAppModel.emp.insertMany([{name:"satya",address:"212232"},{name:"dsadsa","address":"23ddasda"}])
    // .then(resp => {
    //     console.log("data is inserted");
    //     res.send({msg: 'get data is working'});
    // })
 
};

exports.postData = function(req, res) {
    console.log("post called")
    console.log(req.body)
}
//const dbconnection = require('../db/connect-db');
const mongoose = require('mongoose');
var Schema = mongoose.Schema
//dbconnection.connectToDb();

var myEmp = new Schema({
    name:{ type: String, default:""},
    address:{type:String, default: "My new home address"}
  });

module.exports.emp = mongoose.model('emp', myEmp);
//const Model = mongoose.model('emp', myEmp);
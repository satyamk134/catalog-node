const express = require('express')
const app = express();
const mongoose = require('mongoose');
const testAppRouter= require('./routes/test-app.router');
const batchRouter = require('./routes/batch.route')
const config = require("./configs/db.config");
const dbconnection = require('./db/connect-db');
var bodyParser = require('body-parser')
const testAppPolices = require('./policies/test-app.policy');
const https = require('https');
//var indexRouter = require('./routes/index');
app.use(bodyParser.json({ extended: false }))


/********************Db connnection ********************** */
dbconnection.connectToDb();

/**
 * setting cross origin headers 
*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

/**
 * invoking policies
*/
testAppPolices.invokeRolesPolicies();




app.get('/', (req, res) => {
  res.send('Hello World!')
});


/***************routes***************/

//req.user = ['admin']
app.use('/testApp',testAppPolices.isAllowed,testAppRouter);

app.use('/batch',batchRouter);



app.listen(4545, () => {
  console.log('Example app listening on port 4545!')
});

// https.createServer({
//   ssl:true
// }, app)
// .listen(4545);
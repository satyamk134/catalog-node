const mongoose = require('mongoose');
const config = require('../configs/db.config');

exports.connectToDb = ()=>{
    /**
     * For local 
    */
   //mongoose.connect('mongodb://'+config.connection.database.host+':'+config.connection.database.port+'/'+config.connection.database.database, {useNewUrlParser: true})
    /**
     * For catalog Dev
    */
   console.log("connection string is"+config.connection.catalog_dev.username+':'+config.connection.catalog_dev.password+'@'+config.connection.catalog_dev.host+':'+config.connection.catalog_dev.port+'/'+config.connection.catalog_dev.database)
   mongoose.connect('mongodb://'+config.connection.catalog_dev.username+':'+config.connection.catalog_dev.password+'@'+config.connection.catalog_dev.host+':'+config.connection.catalog_dev.port+'/'+config.connection.catalog_dev.database+'?ssl=true', {useNewUrlParser: true})
   mongoose.set('debug', true);
    mongoose.connection.on('connected', function() {
        console.log("Db is successfully connected")
    });
    mongoose.connection.on('error', function(err) {
        console.log("Error in connecting to the DB",err)
    });
    mongoose.connection.on('disconnected', function(err) {
        console.log("DB connection is disconneted",err)
    });
}






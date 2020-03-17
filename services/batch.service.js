const batchModels = require('../models/batch.model');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Batch = mongoose.model('Batch');
const Order = mongoose.model('Order');
const Input = mongoose.model('input');
const ProcessRules = mongoose.model('ProcessRules');
const Template = mongoose.model('Template');
const Unit = mongoose.model('units');
const ObjectId = mongoose.Types.ObjectId;

exports.getClients = ()=>{
    return User.find({roles:"client"},{first_name:1,_id:1})
    .then(response=>{return response})
    .catch(err=>{resizeBy.json(err)});

}

exports.getManagers = () => {
    return User.find({roles:"manager"},{first_name:1,_id:1})
    .then(response=>{return response})
}

exports.getBatches = () => {
    return batchModels.batch.find({},{_id:0,__v:0})
    .then(resp=>{return resp})
}

exports.createOrder = (reqObj)=>{
    return Order.insertMany(reqObj.data)
            .catch(err=>{return { status:"Error", msg:"Error in creating the order"}})

}

exports.createBatches = (req) => {

    return batchModels.batch.insertMany(req.body)
    .then(resp=>{return {status:"sucess", response:resp}})
}

exports.addProcessRules = (reqObj)=>{
    return ProcessRules.insertMany(reqObj)
    .then(resp=>{return {status:"sucess", response:resp}})
}



exports.createInput = (reqObj)=>{
    return Input.insertMany(reqObj)
}

exports.allotClientToManagers = (reqObj) => {

    let matchStatement = {clinetIds:{$in:reqObj.clientIds }};
    let updateStatement = {$set:{managetId:reqObj.managerId}};
    console.log("match statement is",matchStatement);
    console.log("update statement is",updateStatement);
    return Batch.updateMany(matchStatement, updateStatement)
            .catch(err=>{return {status:"Error",msg:"Error in updating the batch"}})

     
}

exports.insertManyToCollection = (reqObj) => {
    let collection = mongoose.model(reqObj.collection);
    return collection.insertMany(reqObj.data);
}

exports.firstIteration = (reqObj)=>{
    /**
     * fetch docs from templates
    */
   let fetchTemplates = ()=>{
       let matchStatement = { category:reqObj.category};
       return Template.find(matchStatement)
       
   }

   let fetchInputs = () => {
       let matchStatement = {$and:[{"splitBy.attributeName":"category"},{"splitBy.attributeValue":reqObj.category}]}
       return Input.find(matchStatement)
       
    }

    let getTempalateAndInput = ()=> {
        return Promise.all([fetchTemplates(), fetchInputs()])
    }

    let iteration = () => {

        return getTempalateAndInput()
        .then(response => {
            /**
             * now we have both the input and output
            */
            //index 0 have the template which contains the rule and input and output headers
            console.log("respnse is",response[0]);

            /**
             * empty objects
            */
            let unitData = response[0].map(()=>{return {}})
            
            /**
             * iterate over headers 
            */
           let unitOutput = [];
           response[0].forEach(element=>{
                
                if(element.rule == "copy") {

                    let copyFrom = element.input;
                    let outputHeader = element.output;
                    unitOutput = response[1].map(unit=>{
                        let obj = {};
                        obj[outputHeader] = unit.data[copyFrom];
                        return obj;
                    })
                }
           })
           console.log("output data is"+JSON.stringify(unitOutput));
           return unitOutput;
        })

    }

    let updateUnit = (unitOutput) => {
        /**** updateOne for batches ****/

        /**
         *first find 
         *
         */
        let findUnits = () => {
            let matchStatement = { 
                orderId:"5e6c7cebb6d37059d77f62a1",
                batchId: "5e6c7cebb6d37059d77f62a2"
            }
            return Unit.find(matchStatement)
        }

        /**
         * then update
        */

        let update  = (units) => {
            let outputkey = Object.keys(unitOutput[0])[0];
            console.log("key is",outputkey)
            let updatesArray = [];
            let actualKey = "data."+outputkey;
            console.log("unit length is",units.length)

            for(let i=0;i<units.length;i++) {
            
                let filter = {_id: units[i]._id };
                let updates = {};
                updates['$set'] = {};
                updates['$set'][actualKey] = unitOutput[i][outputkey];
                let update = updates;

                let bulkStatements = { updateOne:{filter:filter, update:update } }
                updatesArray.push(bulkStatements);
                console.log("update array is"+JSON.stringify(updatesArray));
            }
            return Unit.bulkWrite(updatesArray);
            
        }

        findUnits()
        .then(update)
        .catch(err=>{
            console.log("Error in updating the unit",err)
        })

    }

    getTempalateAndInput()
    .then(iteration)
    .then(updateUnit)



}




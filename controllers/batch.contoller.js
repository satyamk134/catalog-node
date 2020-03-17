const batchService = require('../services/batch.service')


exports.getClients = (req, res) => {
        batchService.getClients()
        .then(response=>{ return res.status(200).json({data:response, status:"success"})})
        .catch(err=>{
            console.log("Error in getting the clients");
        })
}

exports.getManagers = (req, res) => {
    batchService.getManagers()
    .then(response=>{return res.status(200).json({data:response, status:"success"})})
}

exports.getBacthes = (req,res) => {
    /**
     * for admin get all the batches
    */
   batchService.getBatches()
   .then(resp=>res.json({status:"success",data:resp}))
   .catch(err=>res.json({status:"Error",msg:"Error in getting the batches"}))
   
}

exports.createOrder = (req, res) => {
    let reqObj = {};
    reqObj.data = req.body;

    batchService.createOrder(reqObj)
    .then(response => {
        console.log("Order has been created with batches",response);
    })
    
}

exports.createBatches = (req, res) => {
    batchService.createBatches(req)
    .then(resp=>res.json(resp))
    .catch(err=>{console.log("Error in creating the batches")})
}

exports.createInput = (req, res)=>{
    batchService.createInput(req.body)
    .then(response=>{
        res.status(200).json({status:'success', msg:"Ids are inserted"});
    })
}

exports.addProcessRules = (req, res)=>{
    batchService.addProcessRules(req.body)
    .then(response=>{
        res.status(200).json({status:'success', msg:"Ids are inserted"});
    })
}

exports.addOutputFormat = (req, res)=>{
    batchService.addOutputFormat(req.body)
    .then(response=>{
        res.status(200).json({status:'success', msg:"Ids are inserted"});
    })

}

exports.allotManager = (req, res) => {

    let reqData = {};
    reqData.clientIds = req.body.clients;
    reqData.managerId = req.body.managerId;
    console.log("req data is",reqData);
    batchService.allotClientToManagers(reqData)
    .then(respnose=>res.json({status:"success",data:respnose}))
    .catch(err=>{
        console.log("Error in alloting to managers",err);
    })
}

exports.insertManyToCollection = (req, res) => {
    batchService.insertManyToCollection(req.body)
    .then(response=>{
        console.log("All the documents are inserted in the collection");
        return res.json({status:"success", msg:"Dcouments are inserted in "+req.body.collection})
    })
}

exports.firstIteration = (req, res) => {
    
    batchService.firstIteration(req.body)
    .then(response=>{return res.json(response)});
   
}


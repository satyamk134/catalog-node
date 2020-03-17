var express = require('express');
const app = express();
var router = express.Router();
const batchController = require('../controllers/batch.contoller');

router.get('/batches', batchController.getBacthes)
    .post('/batches', batchController.createBatches)
    .put('/batches', batchController.allotManager)

//router.post('/createBatches', batchController.createBatches)

router.get('/getClients', batchController.getClients);

router.get('/getManagers', batchController.getManagers);

router.post('/createOrder', batchController.createOrder);

router.post('/createInput', batchController.createInput);

router.post('/addProcessRules', batchController.addProcessRules);

router.post('/addOutputFormat',batchController.addOutputFormat);

router.post('/insertManyToCollection', batchController.insertManyToCollection);

router.post('/firstIteration', batchController.firstIteration)



//router.get('/getBacthes', batchController.getBacthes)

module.exports = router;

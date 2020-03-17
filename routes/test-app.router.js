var express = require('express');
const app = express();
var router = express.Router();
var testAppController = require('../controllers/test-app.controller');
console.log("came inside test app controller");
router.get('/getData', testAppController.getData);

router.post('/postData', testAppController.postData)
module.exports = router;
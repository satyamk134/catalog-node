const mongoose = require('mongoose');
var Schema = mongoose.Schema
//dbconnection.connectToDb();


/**
 * testsg Schema
 */
var TestSchema = new Schema({
    answer:{
        type: String
    },
    status:{
        type: String
    },
    submitted_on: {
        type: Date,
        default: Date.now
    }
},{ _id : false  });


var BankSchema = new Schema({
    paypalId:{
      type:String,
       default:""
      },
        bank_name:{
            type: String
      },
      branch:{
            type: String
      },
      ifsc:{
            type: String
      },
      account_num:{
            type: String
      },
      account_holder:{
            type: String
      },
      pan_card:{
            type: String
      },
      pan_card_updated_on:{
            type: Date,
        default:Date.now
      },
      gstin:{
            type: String // to delete
      },
      address:{
          type: String
      }
      
  },{ _id : false  });
  /**
   * Company Schema
   */
  var CompanySchema = new Schema({
        client_id:{
            type: Number
      },
      registered_name:{
            type: String
      },
      business_name:{
            type: String
      },
      sec_company:{
            type: Boolean
      },
      sac_code:{
            type: String
      },
      industry_id:{
            type: String
      },
      industry:{
            type: String
      },
      size:{
            type: String
      },
      gstin:{
            type: String
      },
      type:{
            type: String,
          default:'blling'
      }
  },{ _id : false  });
  /**
   * Company Contact Schema
   */
  var CompanyContactSchema = new Schema({
        name:{
            type: String
      },
      email:{
            type: String
      },
      phone:{
            type: String
      }
  },{ _id : false  });
  
  
  
  /**
   * User Schema
   */
  var UserSchema = new Schema({
    first_name: {
      type: String,
      trim: true,
      default: '',
     // validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    last_name: {
      type: String,
      trim: true,
      default: '',
      //validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    email: {
      type: String,
      index: {
        unique: true,
        sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
      },
      lowercase: true,
      trim: true,
      default: '',
      //validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: 'Please fill in a password',
      default: 'textmercato'
    },
    authType:{type:String, default:'local'},
    dob: {
      type: Date
    },
    mobile_num: {
      type: String
    },
    country_code: {
      type: String
    },
    address_1: {
      type: String
    },
    address_2: {
      type: String
    },  
    pincode: {
      type: String
    },
    city: {
      type: String
    },
    state: {
          type: String,
            default:''
    },
    country: {
      type: String
    },
    iso_code: {
        type: String,
      default:''
    },
    rating: {
      type: Number
    },
    salt: {
      type: String
    },
    profileImageURL: {
      type: String,
      default: ''
    },
    provider: {
      type: String,
      required: 'Provider is required'
      
    },
    providerData: {},
    additionalProvidersData: {},
    roles: {
      type: [{
        type: String,
        enum: ['admin', 'client', 'writer', 'manager', 'api', 'manager', 'editor', 'freelance_manager', 'intern', 'bd', 'data_entry', 'contractor']
      }],
      default: ['writer'],
      required: 'Please provide at least one role'
    },
    updated_on: {
      type: Date
    },
    created_on: {
      type: Date,
      default: Date.now
    },
    last_login: {
          type: Date
    },
    /* For reset password */
    resetPasswordToken: {
      type: String
    },
    authToken: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    },
    status: {
      type: Boolean,
      default: false
    },
    recordsLimit: { type: Number, default: 0 },
    projectType: { type: String, default: "" },
    mysql_user_id: {
      type: Number
    },
    mysql_client_id: {
      type: Number
    },
    bank_details: BankSchema,
    company_info: CompanySchema,
    contact_info: CompanyContactSchema,
    tests: [TestSchema],
    junior_managers:[Schema.Types.ObjectId],
    paypalId:{
      type:String,
      default:""
    }
    //_id:Schema.Types.ObjectId
  });

  mongoose.model('User', UserSchema);

var batch = new Schema({
   id: { type:String, default:""},
   createdOn:{ type:Date, default:Date.now()},
   clientName: { type: String, default:'NA'},
   total:{ type:Number, default:0},
   manager:{ type:String, default:"" },
   managerId:{ type:Schema.ObjectId },
   status:{ type:String},
   actions: {type:String, default:""}

});
module.exports.batch = mongoose.model('Batch', batch);

var OrderSchema = new Schema({
  clientId:{ type: Schema.ObjectId},
  splittingAttribute:{ type: Array, default: []},
  images:{ type:Array, default:[]},
    batches:[
        { 
          splittedBy:{},
          count:{ type:Number },
          users:[],
          template:{ type:Array, default:[] }
        }
    ]

});
module.exports.Order = mongoose.model('Order', OrderSchema);

var inputSchema = new Schema({
  "tmId":{ type:String},
    "images":{ type:Array},
    "splitBy":[{"attributeName":"", "attributeValue":""}],
    "data":{

    },
    users:{type:Array, default:[]},
    status:{ type:String }

});
module.exports.input = mongoose.model('input', inputSchema);

var outputSchema = new Schema({
  clientId:{type:String, default:""},
  clientName:{ type:String},
  attributeName:{ type:String},
  allowedValues:{ type:[], default:[]},
  category:{ type: String},
  optinalSplitAttrs:[{attributeName:"",attributeValue:""}],
  fileName:{type:String},
  sheetName:{ type: String}
  

});
module.exports.output = mongoose.model('output', outputSchema);

var templateSchema = new Schema({
  processId:{type:Schema.ObjectId},
  processType: {type:String},
  input:{type:String},
  output:{type:String},
  rule:{type:String}, 
  category:{type:String, default:""},
  optinalSplitAttrs:{type:Array, default:[]},
  clientName:{type:String, default:""},
  ruleParams: {
    operationFrom:{type:String, default:""},
    from:{type:String, default:""},
    min: {type:Number, default:0},
    max: {type:Number, default:10},
    froms: {type:Array, default:[]},
  }
});
module.exports.Template = mongoose.model('Template', templateSchema);

var processRulesSchema = new Schema({
  ruleType:{},
  rules:{
    
  }
  
  // IR:{},

  // WRITER:{
  //   input: "",
  //   output:"",
  //   min:{ type: Number},
  //   max:{}
  // },
  // DE:{},

  // RELATIONAL: {
  //   copy: {
  //     input: {},
  //     output:{},
  //     from:{}
  //   },
  //   concat: { 
  //     input: [],
  //     output:{},
  //     from:{} 
  //   }
  // }
})
module.exports.ProcessRules = mongoose.model('ProcessRules', processRulesSchema);

var unitsSchema = new Schema({
    orderId:{},
    batchId:{},
    data:{type:Object, default:{updateOn:Date.now()}},
    status:{},

})
module.exports.units = mongoose.model('units',unitsSchema)




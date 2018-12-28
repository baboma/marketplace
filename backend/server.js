const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
const md5 = require('md5');
const multer = require('multer');

const app = express();

//app.use(bodyParser.raw({ type: '*/*' }))
//app.use(bodyParser.raw({limit: '10mb'}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
var db;


const url = "mongodb://admin:password1@ds153093.mlab.com:53093/decodedb";

// Initialize connection once
MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
  if(err) throw err;
  db = database;
  // Start the server after the database is ready
  app.listen(4000, () => { 
    console.log("Server started on port 4000");
  });
});

// Create a random id
var create_UUID = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxx-xx4x-xyxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

// Only a jpeg or png image is accepted
const fileFilter = (req, file, cb) => {
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// a multer specifying the destination of storage image
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../frontend/public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null,  new Date().toLocaleDateString().split('-').join('')+file.originalname);
  }
});

//const upload = multer({dest: "uploads"});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// API LOGIN: user log in api
app.post("/login", (req, res) => {
  //debugger
  /*var parsed = JSON.parse(req.body);
  var thisemail = parsed.email;
  var thispassword = md5(parsed.password);*/
  const thisemail = req.body.email;
  const thispassword = md5(req.body.password);
  //debugger
  var query = { email: thisemail, password: thispassword };
  var dbo = db.db("decodedb"); 
  //debugger
  dbo.collection("users").findOne(query, {
    projection: {
      "_id": 0, 
      "id": 1,
      "pseudo": 1
    }
  }, function(err, result) {
    if(err) {
      throw err;
    } else {
      if(result) {
        res.send(JSON.stringify({status: true, message:"login successful!", result}));
      } else {
        res.send(JSON.stringify({status: false, message:"email or password incorrect!", result}));
      }
    }
  });
});

// API SIGNUP: user sign up api
app.post("/signup", (req, res) => {
   //var parsed = JSON.parse(req.body);
   var thisid = create_UUID();
   var thisemail = req.body.email;//parsed.email;
   var thispseudo = req.body.pseudo;//parsed.pseudo;
   var thisname = req.body.name;//parsed.name;
   var thispassword = md5(req.body.password);//md5(parsed.password);
   var thisdate_insc = new Date();
   var dbo = db.db("decodedb");
   var myobj = {  
      "id": thisid,
      "pseudo": thispseudo,
      "email": thisemail,
      "name": thisname,
      "password": thispassword,
      "date_insc": thisdate_insc,
   };
   dbo.collection("users").findOne({
     email: thisemail
    }, 
    function(err, result) {
    if(err){
      throw err;
    } else {
      if(result) {
        res.send(JSON.stringify({ status: false, message:"email already exists!"}));
      } else {
        dbo.collection("users").insertOne(myobj, 
          function(err, result) {
            if(err) {
              throw err;
              //res.send(JSON.stringify({status: false, message:"Signup failed!"}));
            } else {
              res.send(JSON.stringify({ status: true, message:"signup successful!" }));
            }
          }
        );
      }
    }
  });
});

// API USER: retrieve user some infos
app.post("/user", (req, res) => {
  //var parsed = JSON.parse(req.body);
  var thispseudo = req.body.pseudo;//parsed.pseudo;
  var dbo = db.db("decodedb");
  dbo.collection("users").findOne({
    pseudo: thispseudo
  }, { 
    projection: {
      "_id": 0,
      "name": 1, 
      "email": 1, 
      "date_insc": 1
    }
  }, function(err, result) {
    if(err){
      throw err;
    } else {
      if(result) {
        res.send(JSON.stringify({status: true, result}));
      } else {
        res.send(JSON.stringify({status: false, result}));
      }
    }
  });
});

//Update API: user update api
app.post('/updateprofil', (req, res) => {
  //var parsed = JSON.parse(req.body);
  var userid = req.body.user_id;//parsed.user_id;
  var my_infos = {
    address: req.body.address,
    city: req.body.city,
    zipcode: req.body.zipcode,
    province: req.body.province,
    country: req.body.country,
    phonenumber: req.body.phonenumber,
    companyname: req.body.companyname
  }
  var dbo = db.db("decodedb");
  dbo.collection("users").updateOne({
    id: userid
  }, {
    $set: {
      informations: my_infos
    }
  }, function(err, result) {
    if(err){
      throw err;
    } else {
      if(result) {
        res.send(JSON.stringify({status: true, my_infos}));
      } else {
        res.send(JSON.stringify({status: false, result}));
      }
    }
  });
});

//PROFILE API: user get user profile
app.post('/getprofil', (req, res) => {
  //var parsed = JSON.parse(req.body);
  var userid = req.body.user_id;//parsed.user_id;
  var dbo = db.db("decodedb");
  dbo.collection("users").findOne({
    id: userid
  }, {
    projection: {
      _id: 0,
      informations: 1
    }
  }, function(err, result) {
    if(err){
      throw err;
    } else {
      if(result.informations !== undefined) {
        res.send(JSON.stringify({status: true, result}));
      } else {
        res.send(JSON.stringify({status: false, result}));
      }
    }
  });
});

//@route POST /upload
//@desc upload file to DB
app.post('/upload', upload.single('productImage'), (req, res) => {
  //var products_array = [];
  const userid = req.body.user_id;
  var dbo = db.db("decodedb");
  var product_infos = {
    posted_date: new Date(),
    productname: req.body.product_name,
    brandname: req.body.brand_name,
    productdesc: req.body.product_desc,
    productqty: req.body.product_qty,
    productcat: req.body.product_cat,
    productimage: req.file.filename
  }
  //products_array = products_array.concat(product_infos);
  var dbo = db.db("decodedb");
  dbo.collection("users").updateOne({
    id: userid
  }, {
    
    $push: { products: product_infos }
    
  }, function(err, result) {
    if(err){
      throw err;
    } else {
      if(result) {
        res.send(JSON.stringify({status: true, product_infos}));
      } else {
        res.send(JSON.stringify({status: false, result}));
      }
    }
  });
});

//@route POST /sellerProducts
//@desc retrieve product datas from DB
app.post('/sellerProducts', (req, res) => {
  const userid = req.body.user_id;
  var dbo = db.db("decodedb");
  dbo.collection("users").findOne({
    id: userid
  }, {
    
    projection: { 
      "_id": 0,
      "products": 1 }
    
  }, function(err, result) {
    if(err){
      throw err;
    } else {
      if(result) {
        res.send(JSON.stringify({status: true, result}));
      } else {
        res.send(JSON.stringify({status: false, result}));
      }
    }
  });
});

app.get('/allproducts', (req, res) => {
  const dbo = db.db("decodedb");
  dbo.collection("users").find({}, {
    projection: { 
      _id: 0, 
      products: 1 
    }
  }).toArray((err, prd) => {
    if(err){
      throw err;
    } else {
      if(prd) {
        res.send(JSON.stringify({status: true, prd}));
      } else {
        res.send(JSON.stringify({status: false, prd}));
      }
    }
  });
});
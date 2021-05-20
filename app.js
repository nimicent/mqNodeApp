const express      = require('express'),
      path         = require('path'),
      favicon      = require('serve-favicon'),
      cookieParser = require('cookie-parser'),
      bodyParser   = require('body-parser'),
      axios        = require('axios'),
      cors         = require("cors"),
      app          = express(),
      mongoose     = require('mongoose'),
      cfenv        = require("cfenv"),
      appEnv       = cfenv.getAppEnv(),
      dotenv       = require('dotenv'),
      validator    = require('validator');

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

//assets in /public can be used
app.use(express.static(`${__dirname}/public`));

//for env vars
dotenv.config({ path: '.env' });

//set routing
const route      = require('./routes/index');

// IBM Cloud DB for MongoDB setup -
let ca = Buffer.from(process.env.CERTIFICATE_BASE64, "base64");

let mongoDbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  ssl: true,
  sslValidate: true,
  useUnifiedTopology: true,
  sslCA: ca
};

let mongoDB = process.env.MONGO_URL
mongoose.connect(mongoDB, mongoDbOptions);

mongoose.Promise = global.Promise;
let db = mongoose.connection;
//- end of setup

//check health
db.once('open', function(){
  console.log('connected to MongoDB 🦦');
});

//map routing
app.use('/', cors(), route);

//404s
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//500s
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;

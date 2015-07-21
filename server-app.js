require('dotenv').load();

var application_root = __dirname,
    express          = require("express"),
    http             = require('http'),
    path             = require("path"),
    mongoose         = require('mongoose'),
    logger           = require('morgan')('dev'),
    swig             = require('swig');

var config     = require('./config'),
    app        = express(),
    app_port   = process.env.APP_PORT || 8100;


// Connecting MongoDB
console.log(config.mongo.url);
mongoose.connect(config.mongo.url);

// Configuring logger for Express app
app.use(logger);

// serving static files
app.use(express.static(path.join(__dirname, 'www')));

// api routes
app.use('/api/', require('./routes/api_routes'))

var http_server = http.createServer(app);
module.exports = http_server;


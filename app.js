//require('dotenv').config();

const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const fs = require('fs');
const app =express();
const http = require('http');
const appconfig = require('./config/appConfig');
const logger = require('./app/libs/loggerLib')
const globalErrorMiddleware = require('./app/middlewares/appErrorHandler');
const routeLoggerMiddleware = require('./app/middlewares/routeLogger');
const mongoose = require('mongoose');
const morgan = require('morgan');
// const cors = require("cors");

// global.__basedir = __dirname;

// var corsOptions = {
//   origin: "http://localhost:3001"
// };

// app.use(cors(corsOptions));


app.use(morgan('dev'));
//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(globalErrorMiddleware.globalErrorHandler);
app.use(routeLoggerMiddleware.logIp);

// //  //images
// const Grid = require("gridfs-stream");
// const connection = require('./db');
// //const upload = require("./app/routes/upload")
//  //image store api
 

// let gfs;
// connection();

// const conn = mongoose.createConnection('mongodb://localhost/image_upload');;
// conn.once("open", function(){
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection("photos");
// })

// app.use("/file", upload);




const modelsPath = './app/models';
const controllerPath = './app/controllers';
const middlewarePath = './app/middlewares';
const libsPath = './app/libs';
const routesPath = './app/routes';

app.all('*',function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","Origin, X-Requsted-With, Content-Type,Accept");
    res.header("Access-Control-Allow-Methods",'GET,PUT,POST,DELETE');
    next();
});

//bootstrap models
fs.readdirSync(modelsPath).forEach(function(file) {
    if(~file.indexOf('.js')){
        require(modelsPath + '/' + file);
    }
});//end bootstrap model

//bootstrap routes
// fs.readdirSync(routesPath).forEach(function(file) {
//     if(~file.indexOf('.js')){
//         console.log("incliuding the following files");
//         console.log(routesPath+ '/' + file);
//         let route =require(routesPath + '/'+file);
//         route.setRouter(app);
//     }    
// });//end bootstrap
//let routesPath = './routes'  
 fs.readdirSync(routesPath).forEach(function (file) {  
       if (~file.indexOf('.js')) { 
              let route = require(routesPath + '/' + file);
                  route.setRouter(app);   
                 }  
                 });

//calling global 404 handler after route
app.use(globalErrorMiddleware.globalErrorHandler);

/**
 * Create HTTP Server
 */
 const server = http.createServer(app);
 console.log(appconfig);
 server.listen(appconfig.port);
 server.on('error', onError);
 server.on('listening', onListening);
 //end server listening

 function onError(error){
    if(error.syscall !== 'listen'){
        logger.error(error.code +'not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }
    // handling specific listening error
    switch(error.code){
        case 'EACCES':
            logger.error(error.code + ':elevated privileges required', 'serverOnErrorHandler',10);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler',10);
            process.exit(1);
           break;
        default:
            logger.error(error.code + ':sone unknown error occured', 'serverOnErrorHandler',10);
            throw error;
            
    }
}

function onListening(){
    var addr = server.address();
    var bind = typeof addr === 'string'
    ? 'pipe' + addr
    : 'port' + addr.port;
    ('Listening on' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler',0)
   let db = mongoose.connect(appconfig.db.uri); // , {useMongoClient: true}
  // let db = mongoose.createConnection(appConfig.db.uri);
}
process.on('unhandledRejection', (reason, p) =>{
    console.log('Unhandled Rejection at: Promise', p, 'reason:',reason)
});

//handling mongoose connection error event
mongoose.connection.on('error', function(err) {
    console.log('database connection error');
    console.log(err);
    logger.error(err,
        'mongoose connection on error handler',10);
});// end mongoose connection error

//handling mongoose connection success event
mongoose.connection.on('open', function(err) {
    if(err){
    console.log('database  error');
    console.log(err);
    logger.error(err,'mongoose connection open handler',10)
    }else {
        console.log("database connection success !");
        logger.info(" database connection open",'database: connection open handler',0);
    }
});// end mongoose connection success



module.exports = app;

var async = require('async');
var fs = require("fs");
var multer = require('multer');

exports.upload = function(req, res) {
    debugger
    var files = [];
    var custid,coid="",userid="";
    var filewithdir, doc_name = '',
    doc_desp = '';
    var post;

    var Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "Contents/");
        },
        filename: function(req, file, callback) {
            // filename = coid + "_" + enid + "_" + Date.now() + "_" + file.originalname;
            filename =  file.originalname;
            console.log("filename=====>",filename);
            var i = filename.lastIndexOf('.');
            extesion = (i < 0) ? '' : filename.substr(i);
            filewithdir = 'Contents/' + filename;
            files.push(filewithdir);
            callback(null, filename);
           // callback(null,Date.now()+'-'+filename)
        }
    });

    var upload = multer({
        storage: Storage
    }).single("file");//.any();//.array("imgUploader", 60); //Field name and max count 
      upload(req, res, function(err) {
        if (err) {
            console.log("Upload request error",err);
        }
        post = req.body;
        console.log("Upload request",post,files.length);
        sendresult(err);
    });
    function sendresult(err,callback){
        if(files.length == 0 || err){
            var resp ={
                status: '1',
                status_msg : 'Failed'
            }
            res.send(JSON.parse(JSON.stringify(resp)));
		res.end();
        }else{
            var resp ={
                status: '0',
                status_msg : 'success'
            }
            res.send(JSON.parse(JSON.stringify(resp)));
		res.end();
        }
	console.log("response send --> ",resp);
    }
}// ens 2nd method 

//another way
// // bezkoder
// const util = require("util");
// const multer = require("multer");
// const maxSize = 2 * 1024 * 1024;// 2 mb file size

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + "/resources/static/assets/uploads/");
//   },
//   filename: (req, file, cb) => {
//     console.log(file.originalname);
//     cb(null, file.originalname);
//   },
// });

// let uploadFile = multer({
//   storage: storage,
//   limits: { fileSize: maxSize },
// }).single("file");

// let uploadFileMiddleware = util.promisify(uploadFile);
// module.exports = uploadFileMiddleware;
// //end bezkoder





// // old upload code
// const multer = require('multer');
// const mongoose = require('mongoose');


//   //  //images
//   const Grid = require("gridfs-stream");
//   const connection = require('./../../db');
//   //const upload = require("./app/routes/upload")
//    //image store api
   
  
//   let gfs;
//   connection();
  
//   const conn = mongoose.connection;//mongoose.createConnection('mongodb://localhost:3000/image_upload'); //mongoose.connection;
//   conn.once("open", function(){
//       gfs = Grid(conn.db, mongoose.mongo);
//       gfs.collection("photos");
//   })

// //require('dotenv').config();
// // const conn = mongoose.createConnection('mongodb://localhost/image-upload');;
// // conn.once("open", function(){
// //     gfs = Grid(conn.db, mongoose.mongo);
// //     gfs.collection("photos");
// // })

// const {GridFsStorage} = require('multer-gridfs-storage');

// const storage = new GridFsStorage({
//     url: process.env.DB || "mongodb://localhost/image_upload",
//     options: {useNewUrlParser: true, useUnifiedTopology: true},
//     file: (req,file) =>{
//         const match= ["image/png","image/jpeg"];

//         if(match.indexOf(file.mimetype) === -1){
//             const filename = `${Date.now()}-any-name-${file.originalname}`;
//             return filename;
//         }
//         return{
//             bucketName: "photos",
//             filename: `${Date.now()}-any-name-${file.originalname}`
//         }
//     }
// });


// module.exports = multer({storage})
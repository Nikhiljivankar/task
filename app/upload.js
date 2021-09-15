//  //first way
// const upload = require("../middlewares/upload");
// const express = require("express");
// const router = express.Router();


// // router.post("/upload", upload.single("file"),(req, res) =>{
// //     if (req.file === undefined) return res.send("you must select a file.");
// //     const imgUrl = `http://localhost:3000/file/${req.file.filename}`;
// //     return res.send(imgUrl);

// // });

// // module.exports = router;


// // //second way

// // var async = require('async');
// // var fs = require("fs");
// // var multer = require('multer');

// // exports.upload = function(req, res) {
// //     debugger
// //     var files = [];
// //     var custid,coid="",userid="";
// //     var filewithdir, doc_name = '',
// //     doc_desp = '';
// //     var post;

// //     var Storage = multer.diskStorage({
// //         destination: function(req, file, callback) {
// //             callback(null, "./Contents");
// //         },
// //         filename: function(req, file, callback) {
// //             // filename = coid + "_" + enid + "_" + Date.now() + "_" + file.originalname;
// //             filename =  file.originalname;
// //             console.log("filename=====>",filename);
// //             var i = filename.lastIndexOf('.');
// //             extesion = (i < 0) ? '' : filename.substr(i);
// //             filewithdir = 'Contents/' + filename;
// //             files.push(filewithdir);
// //             callback(null, filename);
// //         }
// //     });

// //     var upload = multer({
// //         storage: Storage
// //     }).array("imgUploader", 35); //Field name and max count 
// //       upload(req, res, function(err) {
// //         if (err) {
// //             console.log("Upload request error",err);
// //         }
// //         post = req.body;
// //         console.log("Upload request",post,files.length);
// //         sendresult(err);
// //     });
// //     function sendresult(err,callback){
// //         if(files.length == 0 || err){
// //             var resp ={
// //                 status: '1',
// //                 status_msg : 'Failed'
// //             }
// //             res.send(JSON.parse(JSON.stringify(resp)));
// // 		res.end();
// //         }else{
// //             var resp ={
// //                 status: '0',
// //                 status_msg : 'success'
// //             }
// //             res.send(JSON.parse(JSON.stringify(resp)));
// // 		res.end();
// //         }
// // 	console.log("response send --> ",resp);
// //     }
// // }


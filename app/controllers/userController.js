const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const validateInput = require("../libs/paramsValidationLib");
const response = require("../libs/responseLib");
const time = require('../libs/timeLib');
const check = require("../libs/checkLib");
const logger = require("../libs/loggerLib");

//middleware
const upload = require("../middlewares/upload");


//importing model here
const UserModel = mongoose.model('User')
const Login_log = mongoose.model('Login_log')
const Image_upload = mongoose.model('Image_upload')

//start user sign up function
let signUpFunction =(req,res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not met the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input
    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create User', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            name: req.body.name,
                            // lastName: req.body.lastName || '',  
                            email: req.body.email.toLowerCase(),
                            dob: req.body.dob,
                            org_id: req.body.org_id,
                            password: passwordLib.hashpassword(req.body.password),
                            createdOn: time.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function 


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        }) 
  
}// end user sign up

//start user login  function
let loginFunction =(req,res) => {
    let token=req.cookies.auth|| req.headers || req.bearerHeader;
    User.findByToken(token,(err,user)=>{
        if(err) return  res(err);
        if(user) return res.status(400).json({
            error :true,
            message:"You are already logged in",
            id: user._id,
            email: user.email,
            token:user.token
            
        });
    
        else{
            User.findOne({'email':req.body.email},function(err,user){
                if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
        
              //   const newlog = new Login_log(req.body);
              //   //const id = user._id;
              //   newlog.save((err, doc) => {
              //     if (err) {
              //       console.log(err);
              //       return res.status(400).json({ success: false });
              //     }
              //     res.status(200).json({
              //       success: true,
              //       userid:user._id,
              //       logged_in_date_time: Date.now(),
              //       messege: 'success',
              //       status: 200,
              //     });
              // });

                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie('auth',user.token).json({
                        isAuth : true,
                        id : user._id,
                        token: user.token
                        ,email : user.email
                    });
                });    
          });
        }
    });

}// end user login

//start user logout  function
let logout =(req,res) => {

    let auth =(req,res,next)=>{
        let token =req.cookies.auth || req.headers || req.bearerHeader;
        User.findByToken(token,(err,user)=>{
            if(err) throw err;
            if(!user) return res.json({
                error :true
            });
    
            req.token= token;
            req.user=user;
            next();
    
        })
    }

    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });
}// end user logout

let image = (req,res) =>{
    upload.single("file"),(req, res) =>{
        if (req.file === undefined) return res.send("you must select a file.");
        const imgUrl = `http://localhost:3000/file/${req.file.filename}`;
        return res.send(imgUrl);
    
    }
//     //  //images
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
}
  

module.exports = {
    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout:logout,
    image:image
  
}
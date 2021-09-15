const express = require("express");
const router = express.Router();
const userController = require('./../../app/controllers/userController')
const appconfig = require('./../../config/appConfig')
const auth = require('./../middlewares/auth')
const controller = require("../controllers/file.controller");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../../docs/swagger.json');
// //images
// const Grid = require("gridfs-stream");
// const connection = require('./../../db');
// const upload = require("./../routes/upload")
const upload = require("./../middlewares/upload")


module.exports.setRouter= (app) => {
    //let baseUrl = `${appconfig.apiversion}/users`;
   let baseUrl = `/api/v1/users`;
    console.log(baseUrl);

app.use(`${baseUrl}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // defining routes.
    
    app.post(`${baseUrl}/signup`,auth.isAuthorized,userController.signUpFunction);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user log in
     * 
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * 
     * @apiSuccess {object} myResponce shows error status, message, http status code, data
     * 
     * @apiSuccessExample {object} Success-Responce:
      {
          "error": false,
          "message": "Login Successful",
          "status": 200,
          "data" :
          {
            "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImJyYWQiLCJlbWFpbCI6ImJyYWRAZ21haWwuY29tIn0sImlhdCI6MTYyOTcwNjAyMX0.ldhZGk7-oY_yyF86jvGskRZ65dNDz96-e44cDWGQZmw",
            "userDetails": {
                "mobileNumber":2233445566,
                "email": "someone@gmail.com",
                "lastName": "one",
                "firstName": "some",
                "userId": "-E9zxTYAB"
            }
          }
      }
     */

// params: email, password
app.post(`${baseUrl}/login`,auth.isAuthorized,userController.loginFunction);
/**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to log out user.
     * 
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     * 
     * @apiSuccess {object} myResponce shows error status, message, http status code, data
     * 
     * @apiSuccessExample {object} Success-Responce:
      {
          "error": false,
          "message": "Log Out Successful",
          "status": 200,
          "data" : null
          
          
      }
     */

////auth token params: userId.
app.post(`${baseUrl}/logout`, userController.logout);


// image store api
// let gfs;
// connection();

// const conn = mongoose.createConnection('mongodb://localhost/image-upload');;
// conn.once("open", function(){
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection("photos");
// })

//app.use("/file", upload.upload());

// const port = process.env.PORT || 3000;
// app.listen(port, console.log(`Listening on port ${port}...`));

//app.use("/file", userController.Image);

//app.post(`${baseUrl}/upload`, userController.image);
app.post(`${baseUrl}/upload`, upload.upload);
// app.post(`${baseUrl}/upload`, controller.upload);
// app.get(`${baseUrl}/files`, controller.getListFiles);


}//end setrouter





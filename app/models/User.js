'use strict'

const mongoose = require('mongoose');
 //Schema = mongoose.Schema;

let userSchema = mongoose.Schema({
    userId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    email: {
        type: String,
        default: '',
        unique: true
    },
    name: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: 'password123'
    },
    
    dob: {
        type: Date,
        default: 0,
        trim: true
    },
    org_id:{
        type: String
    },
    token:{
        type: String
    },
    createdOn: {
        type: Date,
        default: ""
    }
}
)

// // generate token

// userSchema.methods.generateToken=function(cb){
//     var user =this;
//     var token=jwt.sign(user._id.toHexString(),confiq.SECRET);

//     user.token=token;
//     user.save(function(err,user){
//         if(err) return cb(err);
//         cb(null,user);
//     })
// }
// // find by token
// userSchema.statics.findByToken=function(token,cb){
//     var user=this;

//     jwt.verify(token,confiq.SECRET,function(err,decode){
//         user.findOne({"_id": decode, "token":token},function(err,user){
//             if(err) return cb(err);
//             cb(null,user);
//         })
//     })
// };

// //delete token

// userSchema.methods.deleteToken=function(token,cb){
//     var user=this;

//     user.update({$unset : {token :1}},function(err,user){
//         if(err) return cb(err);
//         cb(null,user);
//     })
// }

const login_logSchema=mongoose.Schema({
    user_id:{
        type: String,
    },
    logged_in_date_time:{
        type: Date,
        default: Date.now
    }
  
});
 const image_uploadSchema = mongoose.Schema({
     imgUrl:{
         type: String
     }
 });

//module.exports = mongoose.model('User', userSchema);
mongoose.model('User', userSchema);
mongoose.model("Login_log",login_logSchema);
mongoose.model("Image_upload",image_uploadSchema);
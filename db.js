const mongoose = require("mongoose");

module.exports = async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
           //useCreateIndex: true,
            useUnifiedTopology: true,
        };
       const conn= await mongoose.createConnection(process.env.DB || 'mongodb://localhost:3000/image_upload', connectionParams);
        console.log("connected to database");
        //console.log(conn);
    } catch (error) {
        console.log(error);
        console.log("could not connect to database");
    }
};
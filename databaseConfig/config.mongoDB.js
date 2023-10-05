
const URI = `mongodb+srv://${process.env.mongo_USER}:${process.env.mongo_PASSWORD}@cluster0.azv1xi6.mongodb.net/?retryWrites=true&w=majority`


const mongoose = require('mongoose');


async function mongoDBConnection(){
    try{
        console.log("mongoDB connected")
        const mongoDB = await mongoose.connect(URI);
        return mongoDB
    }catch(err){
        console.log(err)
        throw err;
    }
}

module.exports = mongoDBConnection;
 
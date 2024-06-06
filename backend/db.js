const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/blog"

const connectToMongo = () => {
    try{ mongoose.connect(mongoURI)
         console.log("Connected to Mongo Successfully");
    
}catch(err){
    console.log(err.massage);
}
}
    
module.exports = connectToMongo;
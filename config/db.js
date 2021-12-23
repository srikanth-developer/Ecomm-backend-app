const mongoose = require('mongoose')

const dbUrl = process.env.DB_URL
console.log(dbUrl);
console.log(typeof dbUrl);
module.exports.mongooseConnection = mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
},(err)=>{
    if(!err){
        console.log('DB connection is successfull');
    }else{
        console.log('DB connection failed',err);
    }
})
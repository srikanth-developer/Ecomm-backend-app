const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:25
        },
    lastName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:25
        },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
        },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
        },
        hash_password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:['user','admin'],
            default:'admin'
        },
        contactNumber:{
            type:String
        },
        profilePicture:{
            type:String
        }
        
    },{timestamps:true})
    // .creates a hashed password
    userSchema.virtual('password')
    .set(function(password){
        this.hash_password=bcrypt.hashSync(password,10);
    })
    // it will give fullname
    userSchema.virtual('fullName')
    .get(function(){
        return `${this.firstName} ${this.lastName}`
    })
    // password is verified with the hash password in the database
    userSchema.methods={
        authenicate:function(password){
            return bcrypt.compareSync(password,this.hash_password)
        }
    }
module.exports=mongoose.model('user',userSchema)
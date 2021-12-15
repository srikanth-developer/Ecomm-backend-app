const User=require('../models/user')

exports.signup=(req,res)=> { User.findOne({email:req.body.email}).exec((error,user)=>{
    if(user){
        return res.status(400).json({
            message:"user already registered"
        })
    }
})
const {firstName,lastName,email,password}=req.body
console.log(firstName);
const _user=new User({
    firstName,lastName,email,password,
    userName:Math.random().toString()
})
console.log('user',_user);
_user.save((error,data)=>{
    console.log('errpr',error);
    console.log('data start' ,data);
    if(error){
        return res.status(400).json({
            message:'Something went wrong'
        })
    }
    console.log('data',data);
    if(data){
        return res.status(201).json({
            message:'user created successfully'
        })
    }
})
}
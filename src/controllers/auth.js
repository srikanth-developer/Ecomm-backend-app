const User=require('../models/user')
const jwt=require('jsonwebtoken');
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
    userName:Math.random().toString(),
    role:'admin'
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

exports.signin=(req,res)=>{
    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(error){
            return  res.status(400).json({
                error
            })
        }
        console.log('user',user);
        if(user){
            
            if(user.authenicate(req.body.password)){
                console.log(req.body.password);
                // token is generated
                const token=jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:'1h'})
                const {_id,firstName,lastName,email,role,fullName}=req.body
                res.status(200).json({
                    token,
                    user:{
                        _id,firstName,lastName,email,role,fullName
                    }
                })
            }
            else{
               return res.status(400).json({
                    
                    user:"Invalid password"
                })
            }
        }
        else{
            return res.status(400).json({
                message:"Something went wrong"
            })
        }
    })
    // const {firstName,lastName,email,password}=req.body
}
// exports.requiresign=(req,res,next)=>{
//     const token=req.headers.authorization.split(" ")[1]
//     const user=jwt.verify(token,process.env.SECRET_KEY)
//     req.user=user
//     next()
// }
const jwt=require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
    if(req.headers.authorization){
        
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        console.log('user in common-middleware',user);
        
       
        req.user = user;
        
    }else{

        return res.status(400).json({message:"Authorization required"})
    }
    next();
  };
exports.userMiddleware=(req,res,next)=>{
    console.log('usermiddleware');
    if(req.user.role!=='user'){
        return res.status(400).json({message:'User Access denied'})
    }
    next();
    
}
exports.adminMiddleware=(req,res,next)=>{
   console.log('role',req.user.role);
   console.log('role',req.user);
   if(req.user.role!=='admin'){
       return res.status(400).json({message:'Admin Access denied'})
   }
   next();
}
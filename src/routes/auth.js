const express=require('express')
const { signup, signin} = require('../controllers/auth')
const {validateSignupRequest,validateSiginRequest,isRequestValidated}=require('../validators/auth')
const router=express.Router()

router.post('/signup',validateSignupRequest,isRequestValidated,signup)
router.post('/signin',validateSiginRequest,isRequestValidated,signin)
// router.post('/profile',requiresign,(req,res)=>{
//     res.status(200).json({
//         message:'welcome to profile'
//     })
// })

module.exports=router
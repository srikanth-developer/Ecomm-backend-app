const express=require('express')
const { signup, signin, requiresign } = require('../controllers/auth')

const router=express.Router()

router.post('/signin',signin)
router.post('/signup',signup)
// router.post('/profile',requiresign,(req,res)=>{
//     res.status(200).json({
//         message:'welcome to profile'
//     })
// })

module.exports=router
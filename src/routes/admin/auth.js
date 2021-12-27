const express=require('express')
const { signup, signin } = require('../../controllers/admin/auth')
const { validateSignupRequest,validateSiginRequest,isRequestValidated } = require('../../validators/auth')

const router=express.Router()

router.post('/admin/signin',validateSiginRequest,signin)

router.post('/admin/signup',validateSignupRequest,isRequestValidated,signup)



module.exports=router
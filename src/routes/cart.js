const express=require('express')
console.log('here');
const {addItemToCart}=require('../controllers/cart')
const {requireSignin,userMiddleware}=require('../common-middleware')
const router=express.Router();
console.log('routes');
router.post('/user/cart/addtocart',requireSignin,userMiddleware,addItemToCart)
module.exports=router
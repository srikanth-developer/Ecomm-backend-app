const Product = require("../models/product");
// const shortid = require("shortid");
const slugify = require('slugify');
exports.createProduct = (req, res) => {
  // res.status(200).json({
  //     file:req.files,body:req.body
  // })

  const { price, description,  quantity,name, createdBy, category } =req.body;
  let productPictures=[]
  if(req.files.length>0){
      productPictures=req.files.map(file=>{
          return {img:file.filename}
      })
  }
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    quantity,
    productPictures,
    createdBy: req.user._id,
    category
  });

  product.save((error,product)=>{
    if(error){
        return res.status(400).json({error})
    }
    if(product){
      return res.status(200).json({product})
    }
})
};

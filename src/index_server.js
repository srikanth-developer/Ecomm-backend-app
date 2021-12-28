//to create a server
const express = require("express");
const app = express();   //object of express module

//environment variables(const variables) from .env file
const env = require("dotenv");
env.config();
const port = process.env.PORT || 4000;

//body-parser to parse the request body

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// database connection from config folder
require('../config/db.js')

// cors to remove security applied to api
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
//all routes
const authRoutes=require('./routes/auth')

const adminRoutes=require('./routes/admin/auth') //start->route communicate with the controller
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')


//routes
app.use('/api',authRoutes)

app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)


app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to the landing page",
  });
});

app.post("/data", (req, res) => {
  res.status(200).json({
    message: req.body,
  });
});
// server started listening
app.listen(port, () => {
  console.log(`server started listening at port ${port}`);
});

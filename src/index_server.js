//to create a server
const express = require("express");
const app = express();

//environment variables from .env file
const env = require("dotenv");
env.config();
const port = process.env.PORT || 4000;

//body-parser to parse the request body

app.use(express.urlencoded({extended:true}))
app.use(express.json())

require('../config/db.js')

// cors to remove security applied to api
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
//all routes
const authRoutes=require('./routes/auth')

const adminRoutes=require('./routes/admin/auth') //start->route communicate with the controller


//routes
app.use('/api',authRoutes)

app.use('/api',adminRoutes)



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
app.listen(port, () => {
  console.log(`server started listening at port ${port}`);
});

//to create a server
const express = require("express");
const app = express();

//environment variables from .env file
const env = require("dotenv");
env.config();
const port = process.env.PORT;

//body-parser to parse the request body
// app.use(express.json())
app.use(express.json())
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

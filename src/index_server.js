const express = require("express");
const app = express();

//environment variables from .env file
const env = require("dotenv");
env.config();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to the landing page",
  });
});
app.listen(port, () => {
  console.log(`server started listening at port ${port}`);
});

const express = require("express");
const home = require("./route/home");
const app = express();
const PORT = 5000;

console.log("Smartshop.lk Web API");

app.use("/", home);

app.listen(PORT, () => {
  console.log("Listning on Port : " + PORT);
});

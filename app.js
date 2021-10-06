const express = require("express");
const app = express();
const routers = require("./routes/routes");
const path=require("path")
const mongoose=require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.DATABASE)
.then(()=>
{
  console.log('connected');
})
.catch((err)=>{
console.log(err);
});


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use('/',express.static(path.join(__dirname,'public')));
app.use(routers);







app.listen(7000, () => {
  console.log("server started at 7000");
});

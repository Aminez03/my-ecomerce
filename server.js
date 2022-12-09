const express=require("express");
const app=express();
//connect db
const connectDb=require("./config/connectDb")
connectDb()

//router user require
const user=require("./routes/user")
app.use(express.json())
app.use("/user",user)

//router product require
const product = require("./routes/product");
app.use("/product", product);

//router upload
const upload = require("./routes/upload");
app.use("/upload", upload);

//router cart require
const cart= require("./routes/cart");
app.use("/cart", cart)










const PORT=process.env.PORT||5000;
app.listen(PORT,error=>error?console.log(error):console.log(`server is runig successfuly on ${PORT}`))

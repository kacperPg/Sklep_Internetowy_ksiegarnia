const express = require("express");
const app = express();
const mongoose =require("mongoose");
const dotenv = require("dotenv");
const userRout=require("./routes/user");
const authRout=require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config()
mongoose
.connect(process.env.MONGO_URL
)
.then(()=>console.log("DBconent sukces"))
.catch((err)=>{
    console.log(err);
});
app.use(cors());
app.use(express.json());
app.use("/api/users",userRout);
app.use("/api/auth",authRout);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);


app.listen(process.env.PORT ||  5000, ()=>{
    console.log("Server działa!");
});
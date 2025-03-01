require('dotenv').config()
const fs = require("fs")
const express = require("express")
const cookieparser = require("cookie-parser")
const path = require("path")
const {router} =require("./routes")
const blogRout =require("./routes/blog")
const {Connector} = require("./Database/index")

const port = process.env.port
const app = express()
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(express.static(path.join(__dirname, 'public')));
app.use('/profilePic', express.static(path.join(__dirname, 'public/profilePic')));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

Connector("mongodb://127.0.0.1:27017/signup")

app.use("/", router)
app.use("/", blogRout)



app.listen(port, () => console.log(`surver is running at port:${port}`))

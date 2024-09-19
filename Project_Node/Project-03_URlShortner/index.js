const express=require("express");
const cookieParser=require("cookie-parser")
const app=express();
const PORT=8001;
const {connectToMongoDB} =require("./connection")
const URL=require("./Model/url")
const {restrictToLoggedinUserOnly,checkAuth}=require("./middleware/auth")


const userRoute=require("./Routes/user");
const urlRoute=require("./Routes/url")
const staticRoute=require("./Routes/staticRouter")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());


connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>{
    console.log("MongoDB is connected")
})

app.set("view engine","ejs");
const path=require("path");
app.set("views",path.resolve("./views"));



app.use('/',checkAuth,staticRoute);
app.use('/url',restrictToLoggedinUserOnly,urlRoute);
app.use('/user',userRoute);


app.get('/url/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push:{
            visitedHistory:{
                timestamp:Date.now()
        },
    }})
    res.redirect(entry.redirectURL);
})





// Add the following imports at the top of your file
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger');

// Add the following lines after setting up your routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(PORT,()=>{
    console.log(`Server is listening to Port: ${PORT}`);
})
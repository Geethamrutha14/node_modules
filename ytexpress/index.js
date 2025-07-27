import express from 'express'
import cookieParser from 'cookie-parser';
const app = express();

app.use(cookieParser());

app.get('/',(req,res)=>{
    res.cookie('name','express');
    res.send("hello express");
    console.log(req.cookies);
})

app.get('/reading',(req,res)=>{
    console.log("cookie :",req.cookies);
    res.send("read cookies");
})

app.get('/remove',(req,res)=>{
    console.log("removing cookie");
    res.clearCookie('name');
    res.send("cookie cleared");
})
app.listen(3000,()=>{
    console.log("listening....");
})
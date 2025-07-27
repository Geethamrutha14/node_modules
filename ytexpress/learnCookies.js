import express from 'express'
import cookieParser from 'cookie-parser';
import session from 'express-session';
const app = express();

app.use(cookieParser());

app.use(session({
    secret : 'sample-secret',
    resave : false,
    saveUninitialized : false
}))

app.get('/',(req,res)=>{
    console.log(req.cookies);
    res.send("hello express");
})

app.get('/visit',(req,res)=>{
    if(req.session.page_views){
        req.session.page_views++;
        res.send(`you have viewed this page ${req.session.page_views} times`);
    }
    else{
        req.session.page_views = 1;
        res.send('you are viewing this page for the first time');
    }
})

app.get('/remove',(req,res)=>{
    req.session.destroy();
    res.send("session cleared");
})

app.listen(3000,()=>{
    console.log("listening....");
})
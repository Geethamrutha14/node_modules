import express from 'express'
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

let users = [];
app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret : 'sample-secret',
    resave : false,
    saveUninitialized : false
}))

app.get('/',(req,res)=>{
   res.send("welcome to express");
})

app.post('/register',(req,res)=>{
    const {name , password} = req.body;
    users.push({
        name ,
        password
    });
    console.log(users);
    res.send("user registered...");
})

app.post('/login',(req,res)=>{
    const {name , password} = req.body;
    const user = users.find(u => u.name === name);
    if(!user || user.password !== password){
        return res.send("invalid username or password");
    }
    req.session.user = user;
    res.send("login successful");
})

app.get('/dashboard',(req,res)=>{
    if(!req.session.user){
        return res.send("Unauthorized...");
    }
    return res.send(`welcome ${req.session.user.name}`);
})

app.post('/remove',(req,res)=>{
    const username = req.session.user?.name || "John Doe";
    req.session.destroy((err)=>{
        if(err){
           return res.send('error logging out');
        }
        res.send(`${username} logged out successfully`);
    } );
    
})
app.listen(3000,()=>{
    console.log("listening....");
})
import express from 'express'
import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';

let users = [];
const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    console.log("this is the home page...");
    res.send("hello express");
})

app.post('/register',async (req,res)=>{
    const {name , password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    users.push({
        name,
        password : hashedPassword
    })
    res.send("user registered...");
})

app.post('/login',async(req,res)=>{
    const {name , password} = req.body;
    const user = users.find((u)=> u.name === name);
    if(!name || (!await bcrypt.compare(password,user.password))){
        return res.send("invalid credentials...");
    }
    const token = jwt.sign({name},"secret#test");
    res.json({token});
})

app.get('/dashboard',(req,res)=>{
   try {
     const token = req.header('Authorization');
    const decodedToken = jwt.verify(token, "secret#test");
    if(decodedToken.name){
        res.send(`welcome , ${decodedToken.name}`);
    }else{
        res.send('access denied...');
    }
   } catch (error) {
    res.send(error.message);
   }
})

app.listen(3000,()=>{
    console.log("listening...");
})
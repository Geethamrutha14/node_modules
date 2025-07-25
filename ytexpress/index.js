import express from 'express';
import router from './router/user.router.js';

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("this is the home router");
});

app.use('/user',router);

app.post('/users',express.json(),(req,res)=>{
    const {name , email} = req.body;
    res.json({
        message : `username - ${name} and email - ${email} created successfully`
    })
});

app.put('/users/:id',(req,res)=>{
    const {name , email} = req.body;
    const userId = req.params.id;
    res.json({
        message : `user with id - ${userId} updated to username-${name},email-${email}`
    })
});

app.delete('/user/:id',(req,res)=>{
    const uid = req.params.id;
    res.json({
        message : `user with id-${uid} deleted successfully...`
    })
});

app.listen(PORT,()=>{
    console.log("listening...");
});
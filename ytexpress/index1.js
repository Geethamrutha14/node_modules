import express from 'express';
import router from './router/user.router.js';

const app = express();
const PORT = 3000;
app.use(express.json());//built in middleware...

app.use((req,res,next)=>{ // applied for all routes...
    console.log("middleware"+Date.now());
    next();
})

app.use('/welcome',(req,res,next)=>{ //applied for specific routes...
    console.log("this is middleware applied for welcome route only....");
    res.on('finish',()=>{
        console.log("end");
    }); 
    next();
});

app.get('/',(req,res)=>{
    res.send("this is the home router");
});

app.get('/welcome',(req,res)=>{
    res.send("welcome route");
});

app.get('/error',(req,res)=>{
    throw new Error("this is an error");
})

app.use((err,req,res,next)=>{
    console.log(err.message);
    res.send("Error 500: Internal Server Error");
    res.on('finish',()=>{
        console.log("finished");
    })
    next();
})

app.listen(PORT,()=>{
    console.log("listening...");
});


// app.use('/user',router);

// app.post('/users',express.json(),(req,res)=>{
//     const {name , email} = req.body;
//     res.json({
//         message : `username - ${name} and email - ${email} created successfully`
//     })
// });

// app.put('/users/:id',(req,res)=>{
//     const {name , email} = req.body;
//     const userId = req.params.id;
//     res.json({
//         message : `user with id - ${userId} updated to username-${name},email-${email}`
//     })
// });

// app.delete('/user/:id',(req,res)=>{
//     const uid = req.params.id;
//     res.json({
//         message : `user with id-${uid} deleted successfully...`
//     })
// });app.get('/things/:name/:id(\\d{5})',(req,res)=>{
//     const {name , id} = req.params;
//     res.json({
//         name,
//         id
//     })
// })

// app.get('*',(req,res)=>{
//     res.send("sorry! the results are not found!!!");
// })

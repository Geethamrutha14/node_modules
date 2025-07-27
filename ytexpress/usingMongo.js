import express from 'express'
import mongoose from 'mongoose'
import { Person } from './models/person.model.js';

const app = express();
const MONGO_URI = 'mongodb+srv://geethamruthapalla4:express@cluster0.rk2jyun.mongodb.net/express'

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("connected successfully");
})
.catch((err)=>{
    console.log(err);
    console.log("Error")
}) 

//creating a new user in the mongoDB
app.use(express.json());
app.post('/person',async (req,res)=>{
    const {name , age , email} = req.body;
    console.log(req.body);
    
    const validPerson = await Person.findOne({email : email});
    
    if(!validPerson){
         const newPerson = new Person({
         name,
         age,
         email
       })
        await newPerson.save();
        res.send(newPerson);
    } 
    else {
        res.send("user already exists...");
    }
    
})

//updating the data...
app.put('/person',async (req,res)=>{
    const {name , age ,email} = req.body;
    const personData = await Person.findOne({email});
    if(!personData) {
        res.send("Error: 409 No user found!");
        return;
    }
    if(name && personData.name != name) personData.name = name;
    if(age && personData.age != age) personData.age = age;
    await personData.save();
    res.send("user updated...");
})

//deleting the data from the database
app.delete('/person',async (req,res)=>{
    const {email} = req.body;
    const personData = await Person.findOne({email});
    if(personData != null)
    {
        await Person.deleteOne({email});
        return res.send("user deleted...");
    }
    else{
        return res.send("Error:404 No such user");
    }
})

app.listen(3000,()=>{
    console.log("listening at port 3000");
})
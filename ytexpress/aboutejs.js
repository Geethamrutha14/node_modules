import express from 'express'

const app = express();

app.set('view engine','ejs');

app.use('/public',express.static('public'));
//app.use('/images',express.static('images'));
app.get('/',(req,res)=>{
    const userName = "Elon Musk";
    res.render('index',{userName});
})

app.listen(3000,(req,res)=>{
    console.log("listening...");
})
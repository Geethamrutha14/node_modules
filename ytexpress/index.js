import express from 'express'
import multer from 'multer';
import { storage } from './config/storage.js';

const app = express();

// const storage = multer.diskStorage({
//     destination : 'uploads',
//     filename : (req,file,cb)=>{
//         cb(null,file.fieldname+'_'+Date.now()+file.originalname)
//     }
// }) moved to config folder to make it look more clear
const uploads = multer({
    storage : storage,
    // limits : {
    //     fileSize : 1024000 used to set limitations...
    // }
});
app.use(express.urlencoded({extended:true}))
app.use(uploads.single('image'));

app.post('/form',(req,res)=>{
    console.log(`form data :`,req.body);
    console.log(req.file);
    res.send('form recieved');
})
app.listen(3000,()=>{
    console.log('listening...');
})
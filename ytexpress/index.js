import express from 'express';
import { homeController, searchController, userController} from './controllers/user.controller.js';

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/',homeController);

app.get('/user/:id',userController);

app.get('/search',searchController)

app.listen(PORT,()=>{
    console.log("listening...");
})
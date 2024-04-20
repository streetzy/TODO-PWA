import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Authrouter } from './AuthRouter/Auth.js';
import express from 'express';
import { AuthMidleware } from './AuthRouter/Auth.js';

import { user } from './models/modules.js';
import { Console, log } from 'console';
dotenv.config();
mongoose.connect(String(process.env.MONGO_URL)).then(async()=>{
    console.log("DB connected");
})
const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/',Authrouter)

app.get('/',(req,res)=>{
    console.log("gg")
    res.status(200)
})
    



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

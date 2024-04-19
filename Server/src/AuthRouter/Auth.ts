import mongoose from 'mongoose'
import { user } from '../modules';
import { todo } from '../modules';
import express from 'express';
import Joi from 'joi';
import {Md5} from 'ts-md5';
mongoose.connect('mongodb://brandalik_adam_64d3f_hsqzv:oobQvcBNpvKjMG5vvZmGilXUkcaY8OZc@hosting.ssps.cajthaml.eu:3336/brandalik_adam_64d3f_hsqzv_db?authSource=brandalik_adam_64d3f_hsqzv_db')
export const Authrouter:express.Router = express.Router();
Authrouter.use(express.json)
export function AuthMidleware(req: express.Request, res: express.Response, next :express.NextFunction):void{
    next()
}

  
Authrouter.post('/register', (req: express.Request, res: express.Response) => {
    try{

    
        const NewUser = new user
        if(Joi.string().email==req.body.email && req.body.password.length > 8){
            async()=>{
               const User = await user.findOne({email: req.body.email})

                if (User){
                    console.log("/register 400: Email already used")
                    res.status(400)
                    return
                }
                NewUser.email = req.body.email
                NewUser.password = Md5.hashStr(req.body.password)
                await NewUser.save()
                console.log("/register 201: New user added")
                res.status(201)
            }
        }else{
            console.log("/register 400: Invalid data")
            res.status(400)
        }
    }catch{
        console.log("/register 400: Try catch exeption")
        res.status(500)
    }

});
Authrouter.post('/login', async (req: express.Request, res: express.Response) => {
    try{
        const email: string= req.body.email;
        let User = await user.findOne({email: req.body.email}).exec();
    }catch{
        
    }
});

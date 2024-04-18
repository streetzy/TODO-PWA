import mongoose from 'mongoose'


import express from 'express';

mongoose.connect('mongodb://brandalik_adam_64d3f_hsqzv:oobQvcBNpvKjMG5vvZmGilXUkcaY8OZc@hosting.ssps.cajthaml.eu:3336/brandalik_adam_64d3f_hsqzv_db?authSource=brandalik_adam_64d3f_hsqzv_db')
export const Authrouter:express.Router = express.Router();
Authrouter.use(express.json)
export function AuthMidleware(req: express.Request, res: express.Response, next :express.NextFunction):void{
    next()
}

  
Authrouter.post('/register', (req: express.Request, res: express.Response) => {
    
});
Authrouter.post('/login', (req: express.Request, res: express.Response) => {
   
});


import  express from "express";
import mongoose from "mongoose";
import { user } from "../models/modules.js";


export async function getUser(req: express.Request, res: express.Response) {
    try{
        let User = await user.findById(req.body.id).exec();
        if(User){
            User.password = null
            res.status(200).json(User)
        }else{
            res.status(404).send("user not found")
        }
    } catch{
        res.status(500).send("server error")
    }

}
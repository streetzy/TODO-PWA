import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { user } from "../models/modules.js";
import { Md5 } from "ts-md5";
dotenv.config();
import { generateToke } from "./Login.js";
export async function getToken(req: express.Request, res: express.Response) {
    
    jwt.verify(String(req.body.token), String(process.env.REFRESH_TOKEN),async(err, _id)=>{
        if(err){
            res.status(401).send('refresh token not valid')
            console.log("refresh token not valid")
        }else{
            let User = await user.findOne({refreshToken: Md5.hashStr(req.body.token)}).exec();
            console.log(User)
            if (User){
                
                    const accToken = generateToke(String(User._id))
                    res.status(200).json({accessToken : accToken})
                    console.log("Newacc token generated")
                    return
            
                
            }else{
                res.status(401).send("Invalid ref token")
                    console.log("Invalid ref token")
                    return
            }

        //proc je tady kod kdyz je hned nad tim return :skull:
        res.status(401).send("user not found");
        console.log("user not found");
      }
    }
  );
}

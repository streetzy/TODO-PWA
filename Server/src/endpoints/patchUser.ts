
import express from "express";
import mongoose from "mongoose";
import { user } from "../models/modules.js";



export async function patchUser(req: express.Request, res: express.Response) {
    try {
        let User = await user.findById(req.body.Id).exec();
        if (User) {
            if (req.body.userName != User.userName && req.body.userName.length > 4) {
                User.userName = req.body.userName
                User.save()
            }
            res.status(200).send("user patched")

        } else {
            res.status(404).send("user not found")
        }
    } catch {
        res.status(500).send("server error")
    }

}
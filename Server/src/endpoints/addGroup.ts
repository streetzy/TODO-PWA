import { error } from 'console';
import { group } from '../models/modules.ts';
import express from 'express';
import mongoose from 'mongoose'
export async function addGroup(req:express.Request, res :express.Response) {
    try{
        const Group = new group
        if (req.body.groupName.lenngth > 8){
            Group.groupName=  req.body.groupName
            Group.owner = req.body.id
            Group.members.push(req.body.id)
            Group.save()
        }
    }catch(error){
        console.log("addGroup :500")
        console.log(error)
        res.status(500).send("internal error")
    }
}
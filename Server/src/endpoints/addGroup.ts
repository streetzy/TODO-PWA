import { error } from 'console';
import { group, user } from '../models/modules.js';
import express from 'express';
import mongoose from 'mongoose'
export async function addGroup(req:express.Request, res :express.Response) {
    try{
        const Group = new group
        const User = await user.findById(req.body.id)
        if (req.body.groupName.length > 4){
            Group.groupName=  req.body.groupName
            Group.owner = req.body.id
            Group.members.push(req.body.id)
            await Group.save()
            if(User){
                User.groups.push(Group._id)
            }

            res.status(200).json(Group._id);
        }else{
            res.status(400).send(" group name too short")
        }
    }catch(error){
        console.log("addGroup :500")
        console.log(error)
        res.status(500).send("internal error")
    }
}
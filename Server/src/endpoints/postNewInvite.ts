
import  express from "express";
import mongoose from "mongoose";
import { user } from "../models/modules.js";
import { group } from "../models/modules.js";
import { invite } from "../models/modules.js";



export async function postNewInvite(req: express.Request, res: express.Response) {
    try{
        let Group = await group.findById( req.params.groupId).exec();
        let User = await user.findById(req.body.userId).exec();
        if(Group && User){
            let sent = false
            for (let index = 0; index < Group.members.length; index++) {
                const element = Group.members[index];
                if(element == req.body.Id){
                    let Invite = new invite({
                        invited : req.body.userId,
                        group : req.params.groupId,
                    })
                    await Invite.save()
                    User.invitelist.push(Invite._id.id)
                    Group.invitedUsers.push(Invite._id.id)
                    await User.save()
                    await Group.save()
                   sent= true
                    res.status(201).send("invite created")
                }
                if(!sent){
                    res.status(401).send("Not member of this group")
                }
            }
        }
    } catch{
        res.status(500).send("server error")
    }
}
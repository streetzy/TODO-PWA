
import express from "express";
import mongoose from "mongoose";
import { user } from "../models/modules.js";
import { group } from "../models/modules.js";
import { invite } from "../models/modules.js";
import { string } from "joi";



export async function acceptInvite(req: express.Request, res: express.Response) {
    try {
        let Invite = await invite.findById(req.params.inviteId)
        let User = await user.findById(req.body.id)
        if (Invite && User && User._id.id == Invite.invited) {
            let Group = await group.findById(Invite.group)
            if (Group) {
                Group.members.push(User._id)
                User.groups.push(Group._id)
                Group.save()
                User.save()
                res.status(200).send("invite accepted")
            }
        }
    }
    catch {
        res.status(500).send("Server error")
    }
}
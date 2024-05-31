import { error } from 'console';
import { group, invite, user } from '../models/modules.js';
import express from 'express';
import mongoose from 'mongoose'
import { groupInteface } from '../models/modules.js';

export async function getUserInvites(req:express.Request, res :express.Response) {
    try{
        const User = await user.findById(req.body.Id)
        let InviteList = []
        if (User){
            for (let index = 0; index < User.invitelist.length; index++) {
                const element = User.invitelist[index];
                const Invite = await invite.findById(req.body.Id).populate<{ group: groupInteface }>("group")
                let NameId = {
                    inviteId: Invite?._id.id,
                    groupName: Invite?.group.groupName,

                }
                InviteList.push(NameId)
            }
            res.status(200).json(InviteList)
        }else{
            res.status(404).send("user not found")
        }
        
        
    }catch(error){
        res.status(500).send("internal error")
    }
}
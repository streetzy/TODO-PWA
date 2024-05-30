import { error } from 'console';
import { group, invite, user, userInterface } from '../models/modules.js';
import express from 'express';
import mongoose from 'mongoose'
import { groupInteface } from '../models/modules.js';

export async function geGroupInvites(req:express.Request, res :express.Response) {
    try{
        const Group = await group.findById(req.params.groupId)
        let InviteList = []
        if (Group){
            for (let index = 0; index < Group.invitedUsers.length; index++) {
                const element = Group.invitedUsers[index];
                const Invite = await invite.findById(req.body.Id).populate<{ invited: userInterface }>("invited")
                let NameId = {
                    inviteId: Invite?._id.id,
                    UserName: Invite?.invited.userName,

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
import express from "express";
import mongoose from "mongoose";
import { user } from "../models/modules.js";
import { group } from "../models/modules.js";
import { invite } from "../models/modules.js";
import { string } from "joi";

export async function acceptInvite(
  req: express.Request,
  res: express.Response
) {
  try {
    let Invite = await invite.findById(req.params.inviteId);
    let User = await user.findById(req.body.id);
    if (Invite) {
      if (User) {
        if (User._id.toString() == Invite.invited.toString()) {
          let Group = await group.findById(Invite.group);
          await invite.findByIdAndDelete(Invite._id);
          if (Group) {
            Group.members.push(User._id);
            User.groups.push(Group._id);
            await Group.save();
            await User.save();
            res.status(200).send("invite accepted");
          } else {
            res.status(404).send("not Found");
          }
        } else {
          res.status(404).send("not Found 1");
        }
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
}

import mongoose from "mongoose";
import {
  invite,
  inviteInterface,
  user,
  userInterface,
} from "../models/modules.js";
import { todo } from "../models/modules.js";
import express from "express";
import Joi from "joi";
import { Md5 } from "ts-md5";
import jwt from "jsonwebtoken";
import { error, time } from "console";
import { group } from "../models/modules.js";
import dotenv from "dotenv";
import { JsxFlags } from "typescript";

export async function cancelInvite(
  req: express.Request,
  res: express.Response
) {
  try {
    const Group = await group.findById(req.params.groupId);
    if (Group) {
      for (let index = 0; index < Group.invitedUsers.length; index++) {
        const element = Group.invitedUsers[index];
        if (element._id?.toHexString() == req.params.inviteId) {
          const Invite = await invite.findById(element._id);
          if (Invite) {
            Group.invitedUsers.splice(1, index);
            let User = await user.findById(Invite.invited);
            if (User) {
              for (let index = 0; index < User.invitelist.length; index++) {
                const element = User.invitelist[index];
                if (element._id?.toHexString() == req.params.inviteId) {
                  User.invitelist.splice(index, 1);
                  console.log(element._id?.toHexString());
                  res.status(200).send("invite rejected");
                }
              }
              await User.save();
            }
            await invite.findByIdAndDelete(Invite._id);
          }
        }
      }
      await Group.save();
    }
  } catch {
    res.status(500).send("server error");
  }
}

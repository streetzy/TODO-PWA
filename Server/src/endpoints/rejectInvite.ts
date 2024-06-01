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

export async function rejectInvite(
  req: express.Request,
  res: express.Response
) {
  try {
    const User = await user.findById(req.body.id);

    if (User) {
      for (let index = 0; index < User.invitelist.length; index++) {
        const element = User.invitelist[index];
        if (element._id?.toHexString() == req.params.inviteId) {
          const Invite = await invite.findById(element._id);
          if (Invite) {
            User.invitelist.splice(index, 1);
            let Group = await group.findById(Invite.group);
            if (Group) {
              for (let index = 0; index < Group.invitedUsers.length; index++) {
                const element = Group.invitedUsers[index];
                if (element._id?.toHexString() == req.params.inviteId) {
                  Group.invitedUsers.splice(index, 1);
                  await invite.findByIdAndDelete(Invite._id);
                  await Group.save();
                  await User.save();
                  return res.status(200).send("invite rejected");
                }
              }
            }
          }
        }
      }
    }
  } catch {
    res.status(500).send("server error");
  }
}

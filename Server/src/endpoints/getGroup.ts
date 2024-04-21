import mongoose from "mongoose";
import express from "express";
import { group } from "../modules.js";

export async function getGroup(req: express.Request, res: express.Response) {
  try {
    let Group = await group.findById(req.params.groupId).exec();

    if (Group) {
      var sent: boolean = false;
      for (let index = 0; index < Group.members.length; index++) {
        const element = Group.members[index];
        console.log(Group.members[0]._id?.toHexString());

        if (element._id?.toHexString() == req.body.id) {
          console.log("getGroup :200 group sent");
          res.json(Group);
          sent = true;
          return;
        }
      }
      if (!sent) {
        res.status(401).send("gg unlucko");
        console.log("getGroup :401  not a member of this group");
      }
    } else {
      res.status(400).send("group not found");
      console.log("getGroup :400 group not found");
    }
  } catch {
    res.status(500).send("server error");
    console.log("getGroup :500");
  }
}

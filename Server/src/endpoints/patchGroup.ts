import express from "express";

import { group } from "../models/modules.js";

export async function patchGroup(req: express.Request, res: express.Response) {
  try {
    let Group = await group.findById(req.params.groupId).exec();

    if (Group) {
      if (
        Group.groupName != req.body.groupName &&
        req.body.groupName.length > 8
      ) {
        Group.groupName = req.body.groupName;
        Group.save();
      } else {
        res.status(400).send("Group name icorrect format");
      }
    } else {
      res.status(400).send("group not found");
    }
  } catch {
    res.status(500).send("server error");
  }
}

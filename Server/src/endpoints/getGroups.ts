import mongoose from "mongoose";
import { group, user } from "../models/modules.js";
import express from "express";

export async function getGroups(req: express.Request, res: express.Response) {
  const User = await user.findById(req.params.userId).exec();
  if (User) {
    const groupNameId: { groupName: string; groupId: string | undefined }[] =
      [];
    for (let entry = 0; entry < User.groups.length; entry++) {
      const Group = await group.findById(User.groups[entry]._id);
      if (Group) {
        groupNameId.push({
          groupName: String(Group?.groupName),
          groupId: Group.id,
        });
      } else {
        res.status(404).send("GROUP NOT FOUND");
        return;
      }
    }
    res.json(groupNameId);
  } else {
    res.status(404).send("USER NOT FOUND");
  }
}

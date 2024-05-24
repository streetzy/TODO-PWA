import { error } from "console";
import { group } from "../models/modules.js";
import express from "express";
import mongoose from "mongoose";
export async function addGroup(req: express.Request, res: express.Response) {
  try {
    const Group = new group();
    if (req.body.groupName.length > 4) {
      Group.groupName = req.body.groupName;
      Group.owner = req.body.id;
      Group.members.push(req.body.id);
      Group.admins.push(req.body.id);
      Group.save();
      res.status(200).json(Group._id);
    } else {
      res.status(400).send(" group name too short");
    }
  } catch (error) {
    console.log("addGroup :500");
    console.log(error);
    res.status(500).send("internal error");
  }
}

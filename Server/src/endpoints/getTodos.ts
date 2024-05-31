import mongoose from "mongoose";
import { group, todo } from "../models/modules.js";
import express from "express";

export async function getTodos(req: express.Request, res: express.Response) {
  const Group = await group.findById(req.params.groupId).exec();
  if (Group) {
    res.json(Group.todos);
  } else {
    res.status(404).send("Group not found");
  }
}

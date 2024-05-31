import { error } from "console";
import { group } from "../models/modules.js";
import { todo } from "../models/modules.js";
import express from "express";
import mongoose from "mongoose";

export async function deleteGroup(req: express.Request, res: express.Response) {
  try {
    const Group = await group.findById(req.params.groupId);

    if (Group) {
      if (req.body.id == Group.owner) {
        for (let index = 0; index < Group.todos.length; index++) {
          const element = Group.todos[index];
          await todo.findByIdAndDelete(element);
        }
        await group.findByIdAndDelete(req.params.groupId);
        res.status(200).send("group deleted");
      } else {
        res.status(401).send("un authorized");
      }
    } else {
      res.status(404).send("group not found");
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
}

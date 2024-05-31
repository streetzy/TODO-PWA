import { Request, Response } from "express";
import { todo, group } from "../models/modules.js";
import mongoose from "mongoose";

export async function addTodo(req: Request, res: Response) {
  const newTodo = new todo();
  const Group = await group.findById(req.body.groupId);

  if (Group) {
    if (req.body.todoName == "") {
      res.status(400).send("Invalid todo name (no length)");
      return;
    }
    newTodo.authorId = req.body.userId;
    newTodo.todoName = req.body.todoName;
    newTodo.todoContent = req.body.todoDescription;
    newTodo.status = "to-do";
    if (req.body.todoDeadline != "") {
      newTodo.deadline = String(req.body.todoDeadline).split("T")[0]; // the format is usually structured as YEAR-MONTH-DAYThrs:mins
    }

    newTodo.group = Group.id;
    await newTodo.save();
    Group.todos.push(newTodo.id);
    await Group.save();
  } else {
    res.status(404).send("GROUP NOT FOUND");
  }
  res.status(200).send("OK");
}

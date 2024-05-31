import { Request, Response } from "express";

import { todo } from "../models/modules.js";

export async function patchTodo(req: Request, res: Response) {
  const Todo = await todo.findById(req.params.todoId).exec();
  if (Todo == null) {
    res.status(404).send("todo not found");
    return;
  }

  if (req.body.changeStatus) {
    Todo.status = req.body.changeStatus;
  }
  if (req.body.changeInformation) {
    if (req.body.changeName == "") {
      res.status(400).send("INVALID TODO NAME");
      return;
    }
    Todo.todoName = req.body.changeName;
    Todo.todoContent = req.body.changeDescription;

    if (req.body.changeDeadline != "") {
      Todo.deadline = req.body.changeDeadline; // the format is usually structured as YEAR-MONTH-DAYThrs:mins
    }
  }
  await Todo.save();
  res.status(200).send("TODO updated");
}

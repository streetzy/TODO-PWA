import { Request, Response } from "express";
import { todo } from "../modules.js";

export async function addTodo(req: Request, res: Response) {
  console.log(req.body);
  const newTodo = new todo({
    todoName: req.body.todoName,
    status: req.body.todoStatus,
    todoContent: req.body.todoContent,
    authorId: req.body.authorId,
    deadline: req.body.isDeadLine ? req.body.deadline : null,
    group: req.body.isGroup ? req.body.groupId : null,
  });

  await newTodo.save();
  res.status(200).send("OK");
}

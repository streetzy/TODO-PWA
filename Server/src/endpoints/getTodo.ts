import { Request, Response } from "express";

import { todo } from "../models/modules.js";

export async function getTodo(req: Request, res: Response) {
  const Todo = await todo.findById(req.params.todoId);
  if (!Todo) return res.status(404).send("Todo not found");

  res.json({
    todoName: Todo.todoName,
    status: Todo.status,
    todoContent: Todo.todoContent,
    authorId: Todo.authorId,
    deadline: Todo.deadline,
  }); // group isn't included, no need for it to be written out
  res.status(200);
}

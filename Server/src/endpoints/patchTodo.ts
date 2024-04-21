import { Request, Response } from "express";

import { todo } from "../modules.js";

export async function patchTodo(
  req: Request<{ todoId: string }>,
  res: Response
) {
  const originalTodo = await todo.findById(req.params.todoId).exec();

  if (originalTodo == null) {
    res.status(404).send("todo not found");
    return;
  }

  await todo.findByIdAndUpdate(req.params.todoId, {
    deadline: req.body.isDeadline ? req.body.deadline : originalTodo?.deadline,
    status: req.body.statusChange ? req.body.todoStatus : originalTodo?.status,
    todoContent: req.body.todoContentChange
      ? req.body.todoContent
      : originalTodo?.todoContent,
    todoName: req.body.todoNameChange
      ? req.body.todoName
      : originalTodo?.todoName,
  });
  res.status(200).send("OK");
}

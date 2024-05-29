import { Request, Response } from "express";

import { todo } from "../models/modules.js";

export async function deleteTodo(
  req: Request<{ todoId: string }>,
  res: Response
) {
  const deletedTodo = await todo.findByIdAndDelete(req.params.todoId);
  if (!deletedTodo) return res.status(404).send("No todo found with that ID");
  res.status(200).send("OK");
}

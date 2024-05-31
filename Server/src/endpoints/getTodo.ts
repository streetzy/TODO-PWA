import { Request, Response } from "express";

import { todo } from "../models/modules.js";

export async function getTodo(req: Request<{ todoId: string }>, res: Response) {
  const requestedTodo = await todo.findById(req.params.todoId);
  if (!requestedTodo) return res.status(404).send("Todo not found")
  res.json(requestedTodo);
  res.status(200);
}

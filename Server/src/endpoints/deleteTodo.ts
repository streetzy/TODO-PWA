import { Request, Response } from "express";

import { todo } from "../modules.js";

export async function deleteTodo(
  req: Request<{ todoId: string }>,
  res: Response
) {
  await todo.findByIdAndDelete(req.params.todoId);
  res.status(200).send("OK");
}

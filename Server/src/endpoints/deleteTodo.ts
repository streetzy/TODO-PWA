import { Request, Response } from "express";

import { todo, group } from "../models/modules.js";

export async function deleteTodo(req: Request, res: Response) {
  const Todo = await todo.findByIdAndDelete(req.params.todoId);
  if (!Todo) return res.status(404).send("No todo found with that ID");
  const Group = await group.findByIdAndUpdate(req.body.groupId, {
    $pull: { todos: req.params.todoId },
  });
  if (!Group) return res.status(404).send("No group found with that ID");

  Group.save();

  res.status(200).send("OK");
}

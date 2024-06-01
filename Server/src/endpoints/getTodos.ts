import mongoose from "mongoose";
import { group, todo } from "../models/modules.js";
import express from "express";

export async function getTodos(req: express.Request, res: express.Response) {
  const Group = await group.findById(req.params.groupId).exec();
  const todoNameId: {
    todoName: string;
    todoId: string | undefined;
    status: string;
    deadline: string | null | undefined;
  }[] = [];
  if (Group) {
    for (let entry = 0; entry < Group.todos.length; entry++) {
      const Todo = await todo.findById(Group.todos[entry]._id);
      if (Todo) {
        todoNameId.push({
          todoName: Todo.todoName,
          todoId: Todo.id,
          status: Todo.status,
          deadline: Todo.deadline,
        });
      } else {
        res.status(404).send("TODO NOT FOUND");
        return;
      }
    }
    res.json(todoNameId);
  } else {
    res.status(404).send("Group not found");
  }
}

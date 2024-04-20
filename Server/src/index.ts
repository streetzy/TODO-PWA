import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { addTodo } from "./endpoints/addTodo.js";
import { deleteTodo } from "./endpoints/deleteTodo.js";
import { getTodo } from "./endpoints/getTodo.js";
import { patchTodo } from "./endpoints/patchTodo.js";

const app = express();
const PORT = 3000;

dotenv.config();
mongoose.connect(String(process.env.MONGO_URL)).then(async () => {
  console.log("DB connected");
});

app.use(
  cors({
    origin: [`http://localhost:${PORT}`, "http://localhost:5173"],
  })
);

app.use(bodyParser.text());
app.use(bodyParser.json());

app.post("/todo", (req, res) => addTodo(req, res));
app.delete("/todo/:todoId", (req, res) => deleteTodo(req, res));
app.get("/todo/:todoId", (req, res) => getTodo(req, res));
app.patch("/todo/:todoId", (req, res) => patchTodo(req, res));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// POST /login/ => new refresh token
// DELETE /login/ => deletes refresh token from db

// GET /user/:userId
// /register => POST /user
// PATCH /user/:userId

// GET /group/:groupId
// POST /group
// PATCH /group/:groupId
// GET /group/:groupId/user

// 1 user is a group as well

// GET /group/:groupId/todo
// GET /group/:groupId/todo/:todoId
// POST /group/:groupId/todo
// PATCH /group/:groupId/todo/:todoId
// DELETE /group/:groupId/todo/:todoId

// GET /user/:userId/invite
// GET /group/:groupId/invite
// POST /group/:groupId/invite
// POST /user/:userId/invite/:inviteId
// DELETE /group/:groupId/invite/:inviteId => cancel invite
// DELETE /user/:userId/invite/:inviteId => deny invite

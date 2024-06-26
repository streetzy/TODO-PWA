import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { login } from "./endpoints/Login.js";
import { AuthMidleware } from "./endpoints/Middleware/AuthMid.js";
import { addTodo } from "./endpoints/addTodo.js";
import { deleteTodo } from "./endpoints/deleteTodo.js";
import { getTodo } from "./endpoints/getTodo.js";
import { patchTodo } from "./endpoints/patchTodo.js";
import { register } from "./endpoints/Register.js";
import { getToken } from "./endpoints/getToken.js";
import { logOut } from "./endpoints/logOut.js";
import { addGroup } from "./endpoints/addGroup.js";
import { getGroup } from "./endpoints/getGroup.js";
import { patchGroup } from "./endpoints/patchGroup.js";
import { patchUser } from "./endpoints/patchUser.js";
import { getUser } from "./endpoints/getUser.js";
import { postNewInvite } from "./endpoints/postNewInvite.js";
import { acceptInvite } from "./endpoints/postAcceptInvite.js";
import { cancelInvite } from "./endpoints/CancelInvite.js";
import { rejectInvite } from "./endpoints/rejectInvite.js";
import { getGroups } from "./endpoints/getGroups.js";
import { getTodos } from "./endpoints/getTodos.js";
import { getUserInvites } from "./endpoints/getUserInvites.js";
import { getGroupInvites } from "./endpoints/getGroupInvites.js";
const app = express();
const PORT = 3000;
const AuthRouter: express.Router = express.Router();

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

app.post("/user", (req, res) => register(req, res));
app.post("/login", (req, res) => login(req, res));
app.post("/token", (req, res) => getToken(req, res));

app.use(AuthRouter);

AuthRouter.use((req, res, next) => AuthMidleware(req, res, next));

AuthRouter.delete("/login", (req, res) => logOut(req, res));
AuthRouter.patch("/user", (req, res) => patchUser(req, res));

AuthRouter.use("/user/:userId/group", (req, res) => getGroups(req, res));

AuthRouter.post("/group", (req, res) => addGroup(req, res));
AuthRouter.get("/group/:groupId", (req, res) => getGroup(req, res));
AuthRouter.patch("/group/:groupId", (req, res) => patchGroup(req, res));
AuthRouter.get("/group/:groupId/todo", (req, res) => getTodos(req, res));

AuthRouter.post("/group/:groupId/invite", (req, res) =>
  postNewInvite(req, res)
);

AuthRouter.get("/user/invite", (req, res) => {
  getUserInvites(req, res);
});

AuthRouter.get("/user/:userId", (req, res) => getUser(req, res));
AuthRouter.get("/group/:groupId/invite", (req, res) =>
  getGroupInvites(req, res)
);
AuthRouter.post("/user/invite/:inviteId", (req, res) => acceptInvite(req, res));
AuthRouter.delete("/group/:groupId/invite/:inviteId", (req, res) =>
  cancelInvite(req, res)
);
AuthRouter.delete("/user/invite/:inviteId", (req, res) =>
  rejectInvite(req, res)
);
AuthRouter.post("/todo", (req, res) => addTodo(req, res));
AuthRouter.delete("/todo/:todoId", (req, res) => deleteTodo(req, res));
AuthRouter.get("/todo/:todoId", (req, res) => getTodo(req, res));
AuthRouter.patch("/todo/:todoId", (req, res) => patchTodo(req, res));

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

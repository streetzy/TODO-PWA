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
import { getUser } from "./endpoints/getUser.js"

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




app.post('/user',(req,res)=>register(req,res))  
app.post('/login',(req,res)=>login(req,res))
app.post('/token',(req,res)=>getToken(req,res))
app.delete('/login',(req,res)=>logOut(req,res))
app.use(AuthRouter)
AuthRouter.use((req,res,next)=>AuthMidleware(req,res,next))
AuthRouter.get('/user/:userId', (req, res) => getUser(req, res))
AuthRouter.post('/group',(req,res)=>addGroup(req,res))
AuthRouter.get('/group/:groupId',(req,res)=>getGroup(req,res))
AuthRouter.patch('/group/:groupId',(req,res)=>patchGroup(req,res))
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
// GET /user/:userId/group
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

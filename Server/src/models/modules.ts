import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  groups: [{ type: mongoose.Types.ObjectId, ref: "group" }],
  invitelist: [{ type: mongoose.Types.ObjectId, ref: "invite" }],
});

const todoSchema = new mongoose.Schema({
  todoName: { type: String, required: true },
  status: { type: String, required: true },
  todoContent: { type: String, required: true },
  authorId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  deadline: Date,
  group: { type: mongoose.Types.ObjectId, ref: "group" },
});

const groupSchema = new mongoose.Schema({
  todos: [{ type: mongoose.Types.ObjectId, ref: "todo" }],
  groupName: { type: String, required: true },
  invitedUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  admins: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  members: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

const inviteSchema = new mongoose.Schema({
  invited: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  group: { type: mongoose.Types.ObjectId, ref: "group", required: true },
});
export const user = mongoose.model("User", userSchema);
export const todo = mongoose.model("todo", todoSchema);
export const group = mongoose.model("group", groupSchema);
export const invite = mongoose.model("invite", inviteSchema);

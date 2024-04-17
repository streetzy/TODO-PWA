"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://brandalik_adam_64d3f_hsqzv:oobQvcBNpvKjMG5vvZmGilXUkcaY8OZc@hosting.ssps.cajthaml.eu:3336/brandalik_adam_64d3f_hsqzv_db?authSource=brandalik_adam_64d3f_hsqzv_db');
const userSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    createdAt: { Type: Date, default: Date.now },
    userName: String,
    email: String,
    password: String,
    todoLists: [{ Type: mongoose_1.default.Schema.Types.ObjectId, ref: 'todoList' }],
    invitelist: [{ Type: mongoose_1.default.Schema.Types.ObjectId, ref: 'invite' }]
});
const todo = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    createdAt: { Type: Date, default: Date.now },
    todoName: String,
    status: String,
    todoContent: String,
    authorId: { Type: mongoose_1.default.Schema.Types.ObjectId, ref: 'userSchema' },
    deadline: Date
});
const todoList = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    createdAt: { Type: Date, default: Date.now },
    todos: [{ Type: mongoose_1.default.Schema.Types.ObjectId, ref: 'todo' }],
    todoListName: String,
    owner: { Type: mongoose_1.default.Schema.Types.ObjectId, ref: 'userSchema' },
    admins: [{ Type: mongoose_1.default.Schema.Types.ObjectId, ref: 'userSchema' }],
    members: [{ Type: mongoose_1.default.Schema.Types.ObjectId, ref: 'userSchema' }]
});
const invite = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    invited: { Type: mongoose_1.default.Schema.Types.ObjectId, ref: 'userSchema' },
    todoList: { Type: mongoose_1.default.Schema.Types.ObjectId, ref: 'todoList' }
});

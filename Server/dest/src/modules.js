"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invite = exports.group = exports.todo = exports.user = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: String,
    email: String,
    password: String,
    groups: [{ type: mongoose_1.default.Types.ObjectId, ref: 'group' }],
    invitelist: [{ type: mongoose_1.default.Types.ObjectId, ref: 'invite' }]
});
const todoSchema = new mongoose_1.default.Schema({
    todoName: String,
    status: String,
    todoContent: String,
    authorId: { type: mongoose_1.default.Types.ObjectId, ref: 'User' },
    deadline: Date,
    group: { type: mongoose_1.default.Types.ObjectId, ref: 'group' }
});
const groupSchema = new mongoose_1.default.Schema({
    todos: [{ type: mongoose_1.default.Types.ObjectId, ref: 'todo' }],
    groupName: String,
    invitedUsers: [{ type: mongoose_1.default.Types.ObjectId, ref: 'User' }],
    owner: { type: mongoose_1.default.Types.ObjectId, ref: 'User' },
    admins: [{ type: mongoose_1.default.Types.ObjectId, ref: 'User' }],
    members: [{ type: mongoose_1.default.Types.ObjectId, ref: 'User' }]
});
const inviteSchema = new mongoose_1.default.Schema({
    invited: { type: mongoose_1.default.Types.ObjectId, ref: 'User' },
    group: { type: mongoose_1.default.Types.ObjectId, ref: 'groupSchema' },
});
exports.user = mongoose_1.default.model('User', userSchema);
exports.todo = mongoose_1.default.model('todo', todoSchema);
exports.group = mongoose_1.default.model('group', groupSchema);
exports.invite = mongoose_1.default.model('invite', inviteSchema);

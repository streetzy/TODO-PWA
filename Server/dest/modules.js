"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invite = exports.group = exports.todo = exports.user = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    _id: { type: mongoose_1.default.Types.ObjectId,
    },
    userName: String,
    email: String,
    password: String,
    groups: [{ type: mongoose_1.default.Types.ObjectId, ref: 'group' }],
    invitelist: [{ type: mongoose_1.default.Types.ObjectId, ref: 'invite' }]
});
const todoSchema = new Schema({
    _id: { type: mongoose_1.default.Types.ObjectId,
    },
    todoName: String,
    status: String,
    todoContent: String,
    authorId: { Type: mongoose_1.default.Types.ObjectId, ref: 'user' },
    deadline: Date,
    group: { Type: mongoose_1.default.Types.ObjectId, ref: 'group' }
});
const groupSchema = new Schema({
    _id: { type: mongoose_1.default.Types.ObjectId,
    },
    todos: [{ Type: mongoose_1.default.Types.ObjectId, ref: 'todo' }],
    groupName: String,
    invitedUsers: [{ Type: mongoose_1.default.Types.ObjectId, ref: 'user' }],
    owner: { Type: mongoose_1.default.Types.ObjectId, ref: 'user' },
    admins: [{ Type: mongoose_1.default.Types.ObjectId, ref: 'user' }],
    members: [{ Type: mongoose_1.default.Types.ObjectId, ref: 'user' }]
});
const inviteSchema = new Schema({
    _id: { type: mongoose_1.default.Types.ObjectId,
    },
    invited: { Type: mongoose_1.default.Types.ObjectId, ref: 'user' },
    group: { Type: mongoose_1.default.Types.ObjectId, ref: 'group' },
});
exports.user = mongoose_1.default.model('user', userSchema);
exports.todo = mongoose_1.default.model('todo', todoSchema);
exports.group = mongoose_1.default.model('group', groupSchema);
exports.invite = mongoose_1.default.model('invite', inviteSchema);

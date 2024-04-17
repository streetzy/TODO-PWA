import mongoose from 'mongoose'

mongoose.connect('mongodb://brandalik_adam_64d3f_hsqzv:oobQvcBNpvKjMG5vvZmGilXUkcaY8OZc@hosting.ssps.cajthaml.eu:3336/brandalik_adam_64d3f_hsqzv_db?authSource=brandalik_adam_64d3f_hsqzv_db')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { Type :Date , default : Date.now},
    userName: String,
    email: String,
    password: String,
    todoLists: [{Type: mongoose.Schema.Types.ObjectId, ref:'todoList'}],
    invitelist: [{Type: mongoose.Schema.Types.ObjectId, ref:'invite'}]
})

const todo = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { Type :Date , default : Date.now},
    todoName: String,
    status: String,
    todoContent: String,
    authorId: {Type: mongoose.Schema.Types.ObjectId, ref:'userSchema'},
    deadline: Date
})

const todoList = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { Type :Date , default : Date.now},
    todos:[{Type: mongoose.Schema.Types.ObjectId, ref:'todo'}],
    todoListName: String,
    owner: {Type: mongoose.Schema.Types.ObjectId, ref:'userSchema'},
    admins:[{Type: mongoose.Schema.Types.ObjectId, ref:'userSchema'}],
    members:[{Type: mongoose.Schema.Types.ObjectId, ref:'userSchema'}]
})

const invite = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    invited: {Type: mongoose.Schema.Types.ObjectId, ref:'userSchema'},
    todoList: {Type: mongoose.Schema.Types.ObjectId, ref:'todoList'}
})
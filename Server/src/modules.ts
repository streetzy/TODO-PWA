import mongoose from 'mongoose'

mongoose.connect('mongodb://brandalik_adam_64d3f_hsqzv:oobQvcBNpvKjMG5vvZmGilXUkcaY8OZc@hosting.ssps.cajthaml.eu:3336/brandalik_adam_64d3f_hsqzv_db?authSource=brandalik_adam_64d3f_hsqzv_db')

const userSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
            auto: true,
        },
    createdAt: { Type :Date , default : Date.now},
    userName: String,
    email: String,
    password: String,
    groups: [{Type: mongoose.Schema.Types.ObjectId, ref:'groupSchema'}],
    invitelist: [{Type: mongoose.Schema.Types.ObjectId, ref:'inviteSchema'}]
})

const todoSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    createdAt: { Type :Date , default : Date.now},
    todoName: String,
    status: String,
    todoContent: String,
    authorId: {Type: mongoose.Schema.Types.ObjectId, ref:'userSchema'},
    deadline: Date,
    group: {Type: mongoose.Schema.Types.ObjectId, ref:'groupSchema'}
})

const groupSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    createdAt: { Type :Date , default : Date.now},
    todos:[{Type: mongoose.Schema.Types.ObjectId, ref:'todoSchema'}],
    groupName: String,
    invitedUsers: [{Type: mongoose.Schema.Types.ObjectId, ref:'userSchema'}],
    owner: {Type: mongoose.Schema.Types.ObjectId, ref:'userSchema'},
    admins:[{Type: mongoose.Schema.Types.ObjectId, ref:'userSchema'}],
    members:[{Type: mongoose.Schema.Types.ObjectId, ref:'userSchema'}]
})

const inviteSchema = new mongoose.Schema({
    _id:  {type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    invited: {Type: mongoose.Schema.Types.ObjectId, ref:'userSchema'},
    group: {Type: mongoose.Schema.Types.ObjectId, ref:'groupSchema'}
})
export const user = mongoose.model('user',userSchema)
export const todo = mongoose.model('todo',todoSchema)
export const group = mongoose.model('group',groupSchema)
export const invite = mongoose.model('invite',inviteSchema)


async ()=>{
    await mongoose.connect('mongodb://brandalik_adam_64d3f_hsqzv:oobQvcBNpvKjMG5vvZmGilXUkcaY8OZc@hosting.ssps.cajthaml.eu:3336/brandalik_adam_64d3f_hsqzv_db?authSource=brandalik_adam_64d3f_hsqzv_db')

}

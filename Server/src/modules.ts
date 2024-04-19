import mongoose from 'mongoose'



const userSchema = new mongoose.Schema({

    userName: String,
    email: String,
    password: String,
    groups: [{type: mongoose.Types.ObjectId, ref:'group'}],
    invitelist: [{type: mongoose.Types.ObjectId, ref:'invite'}]
})

const todoSchema = new mongoose.Schema({


    todoName: String,
    status: String,
    todoContent: String,
    authorId: {type: mongoose.Types.ObjectId, ref:'User'},
    deadline: Date,
    group: {type: mongoose.Types.ObjectId, ref:'group'}
})

const groupSchema = new mongoose.Schema({


    todos:[{type: mongoose.Types.ObjectId, ref:'todo'}],
    groupName: String,
    invitedUsers: [{type: mongoose.Types.ObjectId, ref:'User'}],
    owner: {type: mongoose.Types.ObjectId, ref:'User'},
    admins:[{type: mongoose.Types.ObjectId, ref:'User'}],
    members:[{type: mongoose.Types.ObjectId, ref:'User'}]
})

const inviteSchema = new mongoose.Schema({

    invited: {type: mongoose.Types.ObjectId, ref:'User'},
    group: {type: mongoose.Types.ObjectId, ref:'groupSchema'},

})
export const user = mongoose.model('User',userSchema)
export const todo = mongoose.model('todo',todoSchema)
export const group = mongoose.model('group',groupSchema)
export const invite = mongoose.model('invite',inviteSchema)



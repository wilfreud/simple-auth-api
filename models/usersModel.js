const { model, Schema } = require('mongoose')

const User = new Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: [true, "Username already exists"]
    },

    email: {
        type: String,
        required: [true, "User email is requierd"],
        unique: [true, "User email must be unique"]
    },

    password: {
        type: String,
        required: [true, "User password is required"]
    }
},
    {
        timestamps: true
    }
)

module.exports = model('User', User)
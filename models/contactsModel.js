const { Schema, model } = require('mongoose')

const Contact = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Contact name is required."]
    },
    phone: {
        type: String,
        required: [true, "Contact name is required."],
        unique: [true, "Contact phone must me unique."]
    },
    email: { type: String },
    group: { type: String }
},
    {
        timestamps: true
    }
)

module.exports = model('Contact', Contact)
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    email_id : {
        type: String,
        required: true
    },
    address: {
        type: Map,
        of: String,
        required: true
    }
},{
    timestamps: true
})

User = mongoose.model("user",userSchema)

module.exports = User
const mongoose = require('mongoose');

//creating a user schema
const userSchema = new mongoose.Schema({
    username:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    role:{ type: String, required: true,enum: ['Admin', 'User'],default: 'User' },
});

module.exports = mongoose.model('User', userSchema)
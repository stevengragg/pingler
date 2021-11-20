import { model, Schema } from 'mongoose';

// User Schema

const userSchema = new Schema({
    userName: String,
    password: String,
    email: String,
    createdAt: String
})

module.exports = model('User', userSchema);

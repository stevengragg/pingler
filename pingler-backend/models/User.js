import pkg from 'mongoose';
const { model, Schema } = pkg;
// User Schema

const userSchema = new Schema({
    userName: String,
    password: String,
    email: String,
    createdAt: String
})

const Users = model('User', userSchema);
export default Users;

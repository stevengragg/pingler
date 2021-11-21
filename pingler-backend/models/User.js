import pkg from "mongoose";
const { model, Schema } = pkg;
// User Schema

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

const User = model("User", userSchema);
export default User;

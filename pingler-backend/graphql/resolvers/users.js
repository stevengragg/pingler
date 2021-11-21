// Imports Model
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Config from "../../config/config.js";
import { UserInputError } from "apollo-server";

const usersResolver = {
  Mutation: {
    /**
     *
     * @param {*} _ Parent resolvers
     * @param {*} args Argument from register mutation, [destructured]
     * @param {*} context
     * @param {*} info General info from meta data
     */

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: Validate user data
      // TODO: Make sure user does not already exists
      const user = await User.findOne({ username });
      if (user) {
        // user exists throw error
        throw new UserInputError("User already exists", {
          error: {
            title: "User Name already exists",
            username: "This username is taken",
          },
        });
      }
      // hash password and create an auth token

      // await since bcrypt is async
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      console.log(res);
      // Generate Json Web token
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        Config.SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

export default usersResolver;

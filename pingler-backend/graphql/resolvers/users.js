// Imports Model
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Config from "../../config/config.js";
import { UserInputError } from "apollo-server";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utils/validators.js";
import log from "../../utils/log.js";

/**
 *
 * @param {Object} user
 * @return Object
 * @summary It generate token for authenticated user
 */
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    Config.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

const usersResolver = {
  Mutation: {
    /**
     *
     * @param {*} _ Parent resolvers
     * @param {*} args Argument from register mutation, [destructured] { registerInput: { username, email, password, confirmPassword } }
     * @param {*} context
     * @param {*} info General info from meta data
     * @description Register mutation that takes registration form input
     */

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      log("register: start", { running: true });
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      // Make sure user does not already exists
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
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
      log("register: saving", { res });
      // Generate Json Web token
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    /**
     *
     * @param {*} _ Parent resolvers
     * @param {*} args Argument from register mutation, [destructured] { loginInput: { username, password } }
     * @param {*} context
     * @param {*} info General info from meta data
     * @description Register mutation that takes registration form input
     */

    async login(_, { loginInput: { username, password } }, context, info) {
      log("login: start", { running: true });
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      log("login: finding user", { user });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError(errors.general, { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError(errors.general, { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};

export default usersResolver;

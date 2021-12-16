// Imports Model
import Post from "../../models/Post.js";
import log from "../../utils/log.js";
import checkAuth from "../../utils/check-auth.js";
import { AuthenticationError } from "apollo-server";
const postsResolver = {
  Query: {
    /**
     * @description to fetch all posts
     * @returns {Object} Posts fetched object
     */

    async getPosts() {
      try {
        log("getPosts: start", { running: true });
        const posts = await Post.find().sort({ createdAt: -1 });
        log("getPosts: ended", { success: posts ? true : false });
        return posts;
      } catch (error) {
        log("getPosts: error", { errorMessage: error.message });
        throw new Error(error);
      }
    },

    /**
     * @param {Object} args.postId Posts Doc Id
     * @param {*} parent mutation
     * @description To fetch one post
     * @returns {Object} Posts fetched object
     */

    async getPost(_, { postId }) {
      try {
        log("getPost: start", { running: true, postId });
        const post = await Post.findById(postId);
        log("getPost: ended", { success: post ? true : false });
        if (!post) throw new Error("Post not found");
        return post;
      } catch (error) {
        log("getPost: error", { errorMessage: error.message });
        throw new Error(error);
      }
    },
  },

  Mutation: {
    /**
     * @param {Object} args.body Body
     * @param {*} _ parent mutation
     * @param {*} context
     * @param {*} info
     * @description To create a post and save it on the database
     * @returns {Object} created post
     */

    async createPost(_, { body }, context, info) {
      //context here could have request header information
      try {
        const user = checkAuth(context);
        log("createPost: start", { body, user: user.id });

        const newPost = new Post({
          body,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString(),
        });

        const post = await newPost.save();
        log("createPost: ended", { post });
        return post;
      } catch (error) {
        log("createPost: failed", { error: error.message });
        throw new Error(error.message);
      }
    },

    /**
     * @param {Object} args.postId Posts document id
     * @param {*} _ parent mutation
     * @param {*} context
     * @param {*} info
     * @description To delete an existing post on the database, if current user owns it
     * @returns {Object} deleted post
     */

    async deletePost(_, { postId }, context) {
      //context here could have request header information
      const user = checkAuth(context);
      log("deletePost: start", { postId, user: user.id });

      try {
        const post = await Post.findById(postId);
        if (!post) throw new Error("Post does not exist");
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

export default postsResolver;

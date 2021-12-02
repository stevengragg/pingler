// Imports Model
import Post from "../../models/Post.js";
import log from "../../utils/log.js";
import checkAuth from "../../utils/check-auth.js";

const postsResolver = {
  Query: {
    /**
     * @description to fetch all posts
     * @returns {Object} Posts fetched object
     */

    async getPosts() {
      try {
        log("getPosts: start", { running: true });
        const posts = await Post.find();
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

    async createPost(_, { body: {} }, context, info) {
      log("createPost: start".body);
      const user = checkAuth(context);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
    },
  },
};

export default postsResolver;

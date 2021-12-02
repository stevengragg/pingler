// Imports Model
import Post from "../../models/Post.js";
import log from "../../utils/log.js";
const postsResolver = {
  Query: {
    /**
     * @description to fetch all posts
     * @returns {Object} Posts fetched object
     */

    async getPosts() {
      try {
        log("getPosts: start", { running: true });
        return await Post.find();
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default postsResolver;

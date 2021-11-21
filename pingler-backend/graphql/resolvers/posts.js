// Imports Model
import Post from "../../models/Post.js";

const postsResolver = {
  Query: {
    /**
     * @returns {Object} Posts fetched object
     */

    async getPosts() {
      try {
        return await Post.find();
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default postsResolver;

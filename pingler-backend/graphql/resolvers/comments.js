import Post from "../../models/Post.js";
import checkAuth from "../../utils/check-auth.js";
import { UserInputError } from "apollo-server";
import log from "../../utils/log.js";
const commentsResolver = {
  Mutation: {
    /**
     *
     * @param {*} _ Parent resolvers
     * @param {String} postId
     * @param {String} body
     * @param {*} context headers
     * @description Create a comment on a post
     */

    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      log("createComment: start", { running: true, username });

      if (body.trim() === "") {
        log("createComment: empty body", { success: false });
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not empty",
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        log("createComment: post found", { post: post._id });
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        log("createComment: post not found", { success: false });
        throw new UserInputError("Post not found");
      }
    },
  },
};

export default commentsResolver;

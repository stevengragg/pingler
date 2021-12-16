import Post from "../../models/Post.js";
import checkAuth from "../../utils/check-auth.js";
import { UserInputError, AuthenticationError } from "apollo-server";
import log from "../../utils/log.js";
const commentsResolver = {
  Mutation: {
    /**
     *
     * @param {*} _ Parent resolvers
     * @param {String} postId
     * @param {String} body
     * @param {*} context headers
     * @returns {Object} Post
     * @description Create a comment on a post
     */

    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      log("createComment: start", { running: true, username, postId, body });

      if (body.trim() === "") {
        log("createComment: empty body", { success: false });
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not empty",
          },
        });
      }

      const post = await Post.findById(Object(postId));
      if (post) {
        log("createComment: post found, commenting", { post: post._id });
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

    /**
     *
     * @param {*} _ Parent resolvers
     * @param {String} postId
     * @param {String} commentId
     * @param {*} context headers
     * @returns {Object} Post
     * @description Delete a comment from the post
     */

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);
      log("deleteComment: started", {
        running: true,
        username,
        postId,
        commentId,
      });

      const post = await Post.findById(Object(postId));
      if (post) {
        log("deleteComment: post found", { postId: post.id });

        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (commentIndex !== -1) {
          log("deleteComment: comment found, deleting comment", {
            postId: post.id,
            commentId,
          });
          if (post.comments[commentIndex].username === username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            log("deleteComment: unable to delete others comment", {
              success: false,
            });
            throw new AuthenticationError("Action not allowed");
          }
        } else {
          log("deleteComment: comment not found", { success: false });
          throw new UserInputError("Comment not found inside the post");
        }
      } else {
        log("deleteComment: post not found", { success: false });
        throw new UserInputError("Post not found");
      }
    },
  },
};

export default commentsResolver;

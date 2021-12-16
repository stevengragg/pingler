import postsResolver from "./posts.js";
import usersResolver from "./users.js";
import commentsResolver from "./comments.js";
import log from "../../utils/log.js";
// Collections of Resolver per Model
const resolvers = {
  // Modifier for Posts
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  // All of the Query Resolver
  Query: {
    // Posts Query resolver
    ...postsResolver.Query,
  },
  // All of the Mutation Resolver
  Mutation: {
    // Users Mutation Resolver
    ...usersResolver.Mutation,
    // Posts Mutation
    ...postsResolver.Mutation,
    // Comments Mutations
    ...commentsResolver.Mutation,
  },
};

export default resolvers;

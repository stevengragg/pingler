import postsResolver from "./posts.js";
import usersResolver from "./users.js";
// Collections of Resolver per Model
const resolvers = {
  // All of the Query Resolver
  Query: {
    // Posts Query resolver
    ...postsResolver.Query,
  },
  // All of the Mutation Resolver
  Mutation: {
    // Users Mutation Resolver
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
  },
};

export default resolvers;

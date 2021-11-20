import postsResolver from './posts.js'
import usersResolver from './users.js'
// Collections of Resolver per Model
const resolvers = {
    Query: { 
        ...postsResolver.Query
     },
    Mutation: { 
        ...usersResolver.Mutation
    }
}

export default resolvers;
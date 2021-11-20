import gql from 'graphql-tag'

// Type Definition for all of the models

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String !
    }
    type Query {
        getPosts: [Post]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
    }
`

export default typeDefs;
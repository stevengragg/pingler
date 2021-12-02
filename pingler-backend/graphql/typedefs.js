import gql from "graphql-tag";

// Type Definition for all of the models

const typeDefs = gql`
  # Post collection type def
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  # User collection type def
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  # Registration Form input def
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  # Registration Form input def
  input LoginInput {
    username: String!
    password: String!
  }
  # Posts.getPosts Query type def
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  # Mutations
  type Mutation {
    # registration form mutation with RegisterInput input def and return User type def
    register(registerInput: RegisterInput): User!
    # login form mutation with LoginInput input def and return User type def
    login(loginInput: LoginInput): User!
    # create post form mutation with body input and return Post type def
    createPost(body: String!): Post!
    # delete post mutation with postId input and return Post type def
    deletePost(postId: String!): Post!
  }
`;

export default typeDefs;

// Pingler Server Entry point


import { ApolloServer } from 'apollo-server'
import gql from 'graphql-tag'
import mongoose from 'mongoose'


const port = 5000;
const connection_uri = 'mongodb+srv://pingAdmin001:weGotCheese002!@cluster0.pqs0x.mongodb.net/pinglerdb?retryWrites=true&w=majority'
const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello world!'
    }
}

const server = new ApolloServer({typeDefs, resolvers});
// Connect to MongoDB
mongoose.connect(connection_uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log('==== MongoDB Connected ====')
    return server.listen(port)
})
.then((res) => {
    console.log(`Server running at ${res.url}`);
})
.catch((err) => console.log(err))



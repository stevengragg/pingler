// Pingler Server Entry point

//Dependencies
import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

// Data Config
import Config from "./config/config.js";
const port = 5000;
const connection_uri = Config.MONGODB;

// GraphQL
import typeDefs from "./graphql/typedefs.js";
import resolvers from "./graphql/resolvers/index.js";

const server = new ApolloServer({ typeDefs, resolvers });
// Connect to MongoDB
mongoose
  .connect(connection_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("==== MongoDB Connected ====");
    return server.listen(port);
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => console.log(err));

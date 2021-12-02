// Pingler Server Entry point

//Dependencies
import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import log from "./utils/log.js";

// Data Config
import Config from "./config/config.js";
const port = 5000;
const connection_uri = Config.MONGODB;

// GraphQL
import typeDefs from "./graphql/typedefs.js";
import resolvers from "./graphql/resolvers/index.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //req from express
  context: ({ req }) => ({ req }),
});
// Connect to MongoDB
mongoose
  .connect(connection_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    log("==== MongoDB Connected ====", { connection_uri });
    return server.listen(port);
  })
  .then((res) => {
    log("==== Server Running ====", { url: res.url });
  })
  .catch((err) => log("Error Occured", { err }));

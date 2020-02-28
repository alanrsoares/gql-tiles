import { ApolloServer } from "apollo-server-lambda";

import context from "../graphql/context";
import { typeDefs, resolvers } from "../graphql/tiles";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

exports.handler = server.createHandler();

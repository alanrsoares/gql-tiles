import { ApolloServer } from "apollo-server-lambda";

import { Context } from "./context";

import { typeDefs, resolvers } from "./";

export default function createServer(context: Context): ApolloServer {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context
  });
}

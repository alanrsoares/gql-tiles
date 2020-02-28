import { ApolloServer } from "apollo-server-lambda";

import { Context } from "../graphql/context";
import { typeDefs, resolvers } from "../graphql/tiles";

export default function createServer(context: Context): ApolloServer {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context
  });
}

import { gql } from "apollo-server-lambda";

import * as tiles from "./tiles";

const typeDefs = gql`
  type Query {
    _: Boolean
  }
`;

export default [typeDefs, tiles.typeDefs];

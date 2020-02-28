import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { AppRoot } from "./ui/components";
import MerchantTiles from "./ui/compounds/MerchantTiles";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql"
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <AppRoot className="App">
      <MerchantTiles />
    </AppRoot>
  </ApolloProvider>
);

export default App;

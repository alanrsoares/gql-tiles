import React from "react";
import ApolloClient from "apollo-boost";
import { AppRoot } from "./components";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql"
});

function App() {
  return <AppRoot className="App">hello</AppRoot>;
}

export default App;

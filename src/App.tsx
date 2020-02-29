import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";

import { AppRoot, AppBar, Logo, Clamp, Body } from "ui/components";
import MerchantTiles from "ui/compounds/MerchantTiles";

import theme from "ui/theme";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql"
});

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AppRoot className="App">
        <AppBar>
          <Clamp>
            <Logo />
          </Clamp>
        </AppBar>
        <Body>
          <Clamp>
            <MerchantTiles />
          </Clamp>
        </Body>
      </AppRoot>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;

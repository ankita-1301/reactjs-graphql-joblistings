import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "./apollo";
import { Layout } from "antd";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import "./styles.css";
import { Route } from "react-router";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <ApolloProvider client={ApolloClient}>
      <div>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Navigation />
          </Header>
          <Content>
            <div className="home-page">
              <Route exact path="/" component={HomePage} />
            </div>
          </Content>
          <Footer className="footer">Footer text here</Footer>
        </Layout>
      </div>
    </ApolloProvider>
  );
}

export default App;

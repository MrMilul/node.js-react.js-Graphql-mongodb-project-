import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Lesson from './component/Lesson.js'


class App extends Component {
  render() {
    const client = new ApolloClient(
      {
        uri: 'http://localhost:3001/graphql',
      }
    )
    return (
     <ApolloProvider client={client}>
          <Lesson />
      </ApolloProvider>
    );
  }
}

export default App;


import React from 'react';
import { render } from 'react-dom';
import App from './App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
});

// uncomment so that webpack can bundle styles
import styles from './scss/style.scss';
console.log('node_env is :', process.env.NODE_ENV);

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

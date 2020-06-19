// if you only need the apollo server and not express, require in 'apollo-server'
// const { ApolloServer } = require('apollo-server');
const typeDefs = require('./apollo/schema.js');
const resolvers = require('./apollo/resolvers.js');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const express = require('express');
// app.use(express.json());

// import Postgres database connection
// const db = require('./models/model.js');

// import logic that defines how API interacts with Posgres models
const PersonAPI = require('./apollo/datasources/personAPI');
const PlanetAPI = require('./apollo/datasources/planetAPI.js');

//
const serverOptions = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    personAPI: new PersonAPI(),
    planetAPI: new PlanetAPI(),
  }),
  context: ({ req, res }) => ({ req, res }),
});

const app = express();

// you can use any middleware with express
// this function sets up apollo to work with your express server
serverOptions.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: 'http://localhost:3000',
  },
});

app.listen({ port: 4000 }, () => {
  console.log('Sever ready at http://localhost:4000${server.graphqlPath}');
});

app.use('/build', express.static(path.join(__dirname, '../build')));

if ((process.env.NODE_ENV = 'production')) {
  app.use('../build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Sorry! URL not Found');
});

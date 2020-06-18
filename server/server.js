const { ApolloServer } = require('apollo-server');
const typeDefs = require('./apollo/schema.js');
const resolvers = require('./apollo/resolvers.js');

// import Postgres database connection
// const db = require('./models/model.js');

// import logic that defines how API interacts with Posgres models
const PersonAPI = require('./apollo/datasources/personAPI');
const PlanetAPI = require('./apollo/datasources/planetAPI.js');

// Creates new apollo server with a particular schema, and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    personAPI: new PersonAPI(),
    planetAPI: new PlanetAPI(),
  }),
});

// Apollo server will run on port 4000 by default
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

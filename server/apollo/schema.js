const { gql } = require('apollo-server');

const typeDefs = gql`
  type Person {
    id: ID!
    name: String
    hairColor: String
    skinColor: String
    gender: String
    # species: Species
    homeworld: Planet
  }

  type Planet {
    id: ID!
    name: String
    climate: String
    gravity: String
    population: Int
  }

  type Species {
    id: ID!
    name: String!
    classification: String
    averageHeight: String
    averageLifespan: String
    language: String
    homeworld: Planet
  }

  type Query {
    people: [Person]!
    person(id: ID!): Person
    planets: [Planet]!
    planet(id: ID!): Planet
  }
`;

module.exports = typeDefs;

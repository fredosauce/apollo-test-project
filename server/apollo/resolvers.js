module.exports = {
  Query: {
    people: (_, __, { dataSources }) => dataSources.personAPI.getPeople(),
    person: (_, { id }, { dataSources }) =>
      dataSources.personAPI.getPersonById({ personId: id }),
    planets: (_, __, { dataSources }) => dataSources.planetAPI.getPlanets(),
    planet: (_, { id }, { dataSources }) =>
      dataSources.planetAPI.getPlanetById({ planetId: id }),
  },
  Person: {
    homeworld: async (person, __, { dataSources }) =>
      dataSources.planetAPI.getPlanetById({ planetId: person.homeWorldId }),
  },
};

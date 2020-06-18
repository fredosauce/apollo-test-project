const { DataSource } = require('apollo-datasource');
const db = require('../../models/model.js');
// Note: the generic DataSource class does not. You can use cache primitives to build your own caching functionality.

class PlanetAPI extends DataSource {
  constructor() {
    super();
    // this.db = db;
  }

  async getPlanets() {
    console.log('Running the get planets function');
    const query = 'select * from planets;';
    const values = [];
    const data = await db.query(query, values);
    const planets = data.rows;
    return Array.isArray(planets)
      ? planets.map((planet) => this.planetReducer(planet))
      : [];
  }

  // TODO: error handling for if there is no matching personId
  async getPlanetById({ planetId }) {
    const query = 'select * from planets where _id = $1';
    const values = [planetId];
    const data = await db.query(query, values);
    console.log('Planet ', planetId);
    return this.planetReducer(data.rows[0]);
  }

  planetReducer(planet) {
    return {
      id: planet._id,
      name: planet.name,
      climate: planet.climate,
      gravity: planet.gravity,
      population: planet.population,
    };
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  //   initialize(config) {
  //     this.context = config.context;
  //   }
}

module.exports = PlanetAPI;

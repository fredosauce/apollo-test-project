const { DataSource } = require('apollo-datasource');
const db = require('../../models/model.js');

// Note: the generic DataSource class does not. You can use cache primitives to build your own caching functionality.

class PersonAPI extends DataSource {
  // when this class is initialized, we'll pass in a db to the constructor
  constructor() {
    super();
    // this.db = db;
  }

  async getPeople() {
    console.log('Running the get people function');
    const query = 'select * from people;';
    const values = [];
    const data = await db.query(query, values);
    const people = data.rows;
    return Array.isArray(people)
      ? people.map((person) => this.personReducer(person))
      : [];
  }

  // TODO: error handling for if there is no matching personId
  async getPersonById({ personId }) {
    const query = 'select * from people where _id = $1';
    const values = [personId];
    const data = await db.query(query, values);
    return this.personReducer(data.rows[0]);
  }

  personReducer(person) {
    return {
      id: person._id,
      name: person.name,
      hairColor: person.hair_color,
      skinColor: person.skin_color,
      homeWorldId: person.homeWorldId,
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

module.exports = PersonAPI;

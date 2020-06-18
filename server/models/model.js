const { Pool } = require('pg');
// require('dotenv').config();

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const URI =
  'postgres://lmtjavza:VU5N98ex58P-5eUuTJWgqczxQpkP8bLR@ruby.db.elephantsql.com:5432/lmtjavza';

console.log('in the DB file');

const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (query, params, cb) => {
    console.log('Executing query: ', query);
    return pool.query(query, params, cb);
  },
}; // <-- export your model

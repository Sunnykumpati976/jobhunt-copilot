// backend/src/models/db.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // set later in .env
});

module.exports = pool;


const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const query = `
  ALTER TABLE api_settings
  ADD COLUMN account_number VARCHAR(255),
  ADD COLUMN account_name VARCHAR(255),
  ADD COLUMN bank_name VARCHAR(255)
`;

client.query(query, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Columns added successfully');
  }
  client.end();
});

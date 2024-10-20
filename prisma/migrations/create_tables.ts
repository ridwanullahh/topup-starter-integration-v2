
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const createTables = async () => {
  try {
    await client.query(
      'CREATE TABLE IF NOT EXISTS users (' +
      'id SERIAL PRIMARY KEY, ' +
      'name VARCHAR(255) NOT NULL, ' +
      'email VARCHAR(255) UNIQUE NOT NULL, ' +
      'username VARCHAR(255) UNIQUE NOT NULL, ' +
      'phone_number VARCHAR(20) UNIQUE NOT NULL, ' +
      'password VARCHAR(255) NOT NULL, ' +
      'role VARCHAR(50) DEFAULT \'normal\', ' +
      'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP' +
      ');'
    );
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables', err);
  } finally {
    client.end();
  }
};

createTables();

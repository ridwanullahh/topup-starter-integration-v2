
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL_POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

const createTables = async () => {
  await client.connect();

  await client.query(
    'CREATE TABLE IF NOT EXISTS users (' +
    'id SERIAL PRIMARY KEY, ' +
    'name VARCHAR(100), ' +
    'email VARCHAR(100) UNIQUE, ' +
    'username VARCHAR(100) UNIQUE, ' +
    'phone_number VARCHAR(15) UNIQUE, ' +
    'password VARCHAR(255), ' +
    'role VARCHAR(50) DEFAULT \'normal\', ' +
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP' +
    ');'
  );

  await client.query(
    'INSERT INTO users (name, email, username, phone_number, password, role) ' +
    'VALUES ' +
    '(\'Admin User\', \'admin@example.com\', \'admin\', \'1234567890\', \'adminpassword\', \'admin\'), ' +
    '(\'Normal User\', \'user@example.com\', \'user\', \'0987654321\', \'userpassword\', \'normal\');'
  );

  await client.end();
};

createTables().catch(err => console.error(err));

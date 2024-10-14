import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'yourpassword',
  database: process.env.DB_NAME || 'pokedex',
});

console.log('Connected to MySQL database');
// process.env
console.log(process.env.DB_HOST);

export default pool;
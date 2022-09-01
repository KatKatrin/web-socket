import * as pg from 'pg'

const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  password: 'user',
  host: 'localhost',
  port: 5432,
  database:'usersdb'
});

export default pool;
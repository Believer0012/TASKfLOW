import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.DB_HOST || '127.0.0.1';
const user = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || '';
const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

const dbNames = [process.env.DB_NAME || 'taskflow', 'taskFlow', 'TaskFlow'];

(async () => {
  try {
    const conn = await mysql.createConnection({ host, user, password, port });

    for (const db of dbNames) {
      try {
        const [rows] = await conn.query(
          `SELECT TABLE_NAME, TABLE_TYPE FROM information_schema.tables WHERE table_schema = ?`,
          [db]
        );
        console.log(`\nTables in database '${db}':`);
        if (!rows.length) {
          console.log('  (no tables)');
        } else {
          rows.forEach(r => console.log('  -', r.TABLE_NAME, `(${r.TABLE_TYPE})`));
        }
      } catch (err) {
        console.log(`\nCould not read database '${db}':`, err.message);
      }
    }

    await conn.end();
  } catch (err) {
    console.error('Connection failed:', err.message || err);
    process.exitCode = 1;
  }
})();

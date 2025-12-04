import mysql from 'mysql2/promise';

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USERNAME || process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '2000',
      database: process.env.DB_NAME || 'taskflow',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    });

    console.log('Connected to MySQL. Checking for tables...');

    const [users] = await conn.query("SHOW TABLES LIKE 'Users';");
    const [refresh] = await conn.query("SHOW TABLES LIKE 'RefreshTokens';");

    console.log('Users table found:', users.length > 0);
    console.log('RefreshTokens table found:', refresh.length > 0);

    if (users.length) console.log('Users rows sample:');
    if (users.length) {
      const [rows] = await conn.query('SELECT id, username, email, createdAt FROM Users ORDER BY id DESC LIMIT 5;');
      console.table(rows);
    }

    await conn.end();
    process.exit(0);
  } catch (err) {
    console.error('DB check failed:', err.message || err);
    process.exitCode = 1;
  }
})();

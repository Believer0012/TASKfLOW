import mysql from 'mysql2/promise';

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '2000',
      database: 'taskFlow_task',
      port: 3306,
    });

    const [rows] = await conn.query('SHOW DATABASES;');
    console.log('Connected successfully. Databases:');
    console.log(rows.map(r => Object.values(r)[0]));

    await conn.end();
  } catch (err) {
    console.error('Connection failed:', err.message || err);
    process.exitCode = 1;
  }
})();

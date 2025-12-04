const { Sequelize } = require('sequelize');
const defineTask = require('./model/base/task');

const sequelize = new Sequelize('taskFlow_task', 'root', '2000', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
});

const Task = defineTask(sequelize, Sequelize.DataTypes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to DB');

    // Fetch all tasks
    const tasks = await Task.findAll();
    console.log('✅ Tasks:', tasks);

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await sequelize.close();
  }
})();

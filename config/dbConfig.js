
const databaseConfig = {
  username: 'root',
  password: '',
  db: process.env.DB,
  host: process.env.HOST,
  dialect: 'mysql',
  port: 3306
};

module.exports = databaseConfig;
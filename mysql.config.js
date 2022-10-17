const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DBNAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    pool: {
        max: 150,
        min: 0,
        acquire: 10000,
        idle: 100
    }
});

module.exports.db = sequelize;
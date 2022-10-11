const Sequelize = require('sequelize');

const sequelize = new Sequelize('todo4', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

module.exports.db = sequelize;
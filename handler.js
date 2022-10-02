const mysqlConfig = require('./mysql.config');

const getAllUsers = () => ({
    status: 'Success',
    message: 'Success',
    data: {
        mysqlConfig.query('SELECT * FROM users', (error, results) => { results })
    }
});

module.exports = { getAllUsers };
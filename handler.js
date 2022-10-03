const db = require('./mysql.config');

const getAllUsers = (request, h) => {

    db.query('SELECT * FROM users', (error, results) => {
        return h.response({
            status: 'Success',
            message: 'Success',
            data: results
        });
    });
};

module.exports = getAllUsers;
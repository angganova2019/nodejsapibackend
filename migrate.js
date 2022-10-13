const { dbactivity } = require('./activity');
const { dbtodo } = require('./todo.js');

dbactivity.sync({ force: true });
dbtodo.sync({ force: true });
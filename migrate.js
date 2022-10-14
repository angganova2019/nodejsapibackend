const { dbactivity } = require('./activity');
const { dbtodo } = require('./todo.js');
const { db } = require('./mysql.config');



const STANDBY_TIME = 1000; // 1 sec
const RETRY = 240; // Retry 4 minutes


const test = async () => {
    let haveFound = false;
    let i = 0;
    while (i < RETRY && !haveFound) {

        // Check the database
        haveFound = await checkDb();
        // If no record found, increment the loop count
        i++
    }
}

const checkDb = () => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            try {
                await db.authenticate();
                console.log('Connection has been established successfully.');
                record = true
                dbactivity.sync({ force: true });
                dbtodo.sync({ force: true });
            } catch (error) {
                record = null;
            }
            // Check whether you've found or not the record
            if (record) return resolve(true);
            resolve(false);

        }, STANDBY_TIME);
    });
}


module.exports.migratedb = test();
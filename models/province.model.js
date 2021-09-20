const sql = require('./db');
const {promisify} = require('util');

sql.query = promisify(sql.query);

/**
 * Get all provinces from DB
 * @param {*} result 
 */
module.exports.getAll = (args, result) => {
    sql.query('SELECT * FROM provinces')
    .then(res => result(null, res))
    .catch(err => result(err, null))
}
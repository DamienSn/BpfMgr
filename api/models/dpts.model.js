const sql = require('./db');
const {promisify} = require('util');

sql.query = promisify(sql.query);

/**
 * Get all provinces from DB
 * @param {*} result 
 */
module.exports.getAll = (args, result) => {
    sql.query('SELECT * FROM departements')
    .then(res => {
        let data = [];
        res.forEach(item => {
            data.push({nom: item.dpt_name, code: item.dpt_id, dpt_cities_number: item.dpt_cities_number})
        })
        result(null, data)
    })
    .catch(err => result(err, null))
}
const citiesRoutes = require('../routes/cities.routes');
const sql = require('./db');

/**
 * Get all cities
 * @param {function} result error; data;
 */
module.exports.getAll = (result) => {
    sql.query('SELECT * FROM cities', (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

/**
 * Get cities where name match to query
 * @param {string} params 
 * @param {function} result error; data;
 */
module.exports.search = (params, result) => {
    sql.query("SELECT * FROM cities WHERE name LIKE '%?%'", params, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}

/**
 * Get one city by ID
 * @param {number} params id of the city
 * @param {function} result error; data;
 */
module.exports.getOne = (params, result) => {
    sql.query("SELECT * FROM cities WHERE id=?", params, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    })
}
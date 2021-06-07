const citiesRoutes = require("../routes/cities.routes");
const sql = require("./db");

/**
 * Get all cities
 * @param {function} result error; data;
 */
module.exports.getAll = (result) => {
    sql.query("SELECT * FROM cities", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

/**
 * Get cities where name match to query
 * @param {string} params
 * @param {function} result error; data;
 */
module.exports.search = (params, result) => {
    sql.query(
        "SELECT * FROM cities WHERE name LIKE '%?%'",
        params,
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        }
    );
};

/**
 *
 * @param {object} params Query parameters
 *
 * @param {number | string} params.id Id
 * @param {string} params.name name
 * @param {string} params.departement departement
 * @param {number} params.province province
 * @param {number} params.poiId poi_id
 *
 *
 * @param {Function} result  Callback : err; data;
 */
module.exports.getOne = (params, result) => {
    const queryGetOne = `SELECT * FROM cities
    WHERE id=?
    OR name LIKE "%${params.name}%"
    OR departement=?
    OR province LIKE "%${params.province}%"
    OR poi_id=?`;

    const parameters = [
        params.id,
        params.departement,
        params.poiId,
    ];

    console.log(parameters);

    const query = sql.query(queryGetOne, parameters, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
    console.log(query);
};

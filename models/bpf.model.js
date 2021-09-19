const sql = require("./db.js");
const { promisify } = require("util");
const { query } = require("./db.js");
const sqlString = require("sqlstring");

sql.query = promisify(sql.query);

/**
 * Create a BPF into DB
 * @param {object} params Query parameters
 * @param {*} result err; data;
 */
module.exports.create = (params, result) => {
    let { name, date, userId } = params;

    const queryInsert = `INSERT INTO bpfs(bpf_city_id, bpf_user_id, bpf_date)
    VALUES(?, ?, ?)`;

    const queryVerify = `SELECT * FROM bpfs WHERE bpf_user_id=? AND bpf_city_id=?`;

    const querySelectCity = `SELECT city_id FROM cities
    WHERE city_name LIKE ${sqlString.escape(name)}`;

    sql.query(querySelectCity)
        .then((res) => {
            const cityId = res[0].city_id;

            // Verify is the city isn't yet validated
            sql.query(queryVerify, [userId, cityId])
                .then((res) => {
                    if (res.length == 0) {
                        sql.query(queryInsert, [cityId, userId, date])
                            .then((res) => {
                                result(null, res);
                            })
                            .catch((err) => {
                                result(err, null);
                            });
                    } else {
                        result("existing yet", null);
                    }
                })
                .catch((err) => result(err, null));
        })
        .catch((err) => {
            result(err, null);
        });
};

/**
 * Get a bpf from DB
 * @param {Object} params
 * @param {Function} result
 */
module.exports.getOne = (params, result) => {
    const { id, date } = params;

    const queryGetOne = `
    SELECT bpf_city_id, bpf_user_id, bpf_date, city_name, city_departement, dpt_name, city_province_id, province_name, city_lat, city_long, user_email, user_name
    FROM bpfs
    INNER JOIN cities ON bpf_city_id=city_id
    INNER JOIN users ON bpf_user_id=user_id
    INNER JOIN provinces ON city_province_id=province_id
    INNER JOIN departements ON city_departement=dpt_id
    WHERE bpf_city_id=${sqlString.escape(id)}
    OR bpf_date=${sqlString.escape(date)}`;

    sql.query(queryGetOne)
        .then((res) => result(null, res))
        .catch((err) => result(err, null));
};

/**
 * Select bpfs of user in DB
 * @param {number} id Id of the user
 * @param {*} result
 */
module.exports.getAllByUser = (id, result) => {
    id = parseInt(id);
    const queryGetAllByUser = `
    SELECT bpf_city_id, bpf_user_id, bpf_date, city_name, city_departement, dpt_name, city_province_id, province_name, city_lat, city_long, user_email, user_name
    FROM bpfs
    INNER JOIN cities ON bpf_city_id=city_id
    INNER JOIN users ON bpf_user_id=user_id
    INNER JOIN provinces ON city_province_id=province_id
    INNER JOIN departements ON city_departement=dpt_id
    WHERE bpf_user_id=?`;

    sql.query(queryGetAllByUser, id)
        .then((res) => result(null, res))
        .catch((err) => result(err, null));
};

/**
 * Delete a bpf from the DB
 * @param {Object} params query parameters
 * @param {*} result
 */
module.exports.deleteOne = (params, result) => {
    const { userId, cityId } = params;

    const queryDeleteOne = `DELETE FROM bpfs
    WHERE bpf_user_id=? AND bpf_city_id=?`;

    sql.query(queryDeleteOne, [userId, cityId])
        .then((res) => result(null, res))
        .catch((err) => result(err, null));
};

/**
 * Delete all bpfs of an user from the DB
 * @param {number} userId User id
 * @param {*} result
 */
module.exports.deleteAllByUser = (userId, result) => {
    const queryDeleteAll = `DELETE from bpfs
    WHERE bpf_user_id=?`;

    sql.query(queryDeleteAll, userId)
        .then((res) => result(null, res))
        .catch((err) => result(err, null));
};

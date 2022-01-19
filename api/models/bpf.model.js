const sql = require("./db.js");
const { promisify } = require("util");
const { query } = require("./db.js");
const sqlString = require("sqlstring");
const bcnModel = require("./bcn.model");
const { logger } = require("../logs/logger.js");

sql.query = promisify(sql.query);

/**
 * Create a BPF into DB
 * @param {object} params Query parameters
 * @param {*} result err; data;
 */
module.exports.create = async (params, result) => {
    let { name, date, userId } = params;

    const queryInsert = `INSERT INTO bpfs(bpf_city_id, bpf_user_id, bpf_date)
    VALUES(?, ?, ?)`;

    const queryVerify = `SELECT * FROM bpfs WHERE bpf_user_id=? AND bpf_city_id=?`;

    const queryBcn = `SELECT * FROM bcns WHERE bcn_user_id=? AND bcn_dpt=?`;

    const queryCreateBcn =
        "INSERT INTO bcns(bcn_bpf_id, bcn_city_id, bcn_user_id, bcn_dpt, bcn_verification) VALUES (?, ?, ?, ?, ?)";
    let escaped = sqlString.escape(name);
   escaped = escaped.substring(1, escaped.length-1)
    const querySelectCity = `SELECT city_id, city_departement FROM cities
    WHERE city_name LIKE "%${escaped}%"`

    const selectedCity = await sql
        .query(querySelectCity)
        .catch((err) => result(err, null));
    if (selectedCity.length == 0) {
        // logger.log(name)
        result("no city found", null);
        return;
    }
    const cityId = selectedCity[0].city_id;
    const dpt = selectedCity[0].city_departement;

    // Verify is the city isn't yet validated
    const verifyBpf = await sql
        .query(queryVerify, [userId, cityId])
        .catch((err) => result(err, null));
    if (verifyBpf.length !== 0) {
        result("existing yet", null);
        return;
    }

    // Create BPF
    const bpf = await sql
        .query(queryInsert, [cityId, userId, date])
        .catch((err) => result(err, null));

    // Verify if BCN is validated
    const bcnValidated = await sql
        .query(queryBcn, [userId, dpt])
        .catch((err) => result(err, null));

    // Final steps
    if (bcnValidated.length == 0) {
        // Get BpfId
        const bpfId = await sql.query(
            "SELECT bpf_id FROM bpfs WHERE bpf_user_id=? AND bpf_city_id=?",
            [userId, cityId]
        );
        // Validate BCN
        sql.query(queryCreateBcn, [
            bpfId[0].bpf_id,
            cityId,
            userId,
            dpt,
            userId + dpt,
        ])
            .then((res) => result(null, res))
            .catch((err) => result(err, null));
    } else {
        result(null, bpf.data);
    }
};

/**
 * Get a bpf from DB
 * @param {Object} params
 * @param {Function} result
 */
module.exports.getOne = (params, result) => {
    const { id, date } = params;

    const queryGetOne = `
    SELECT bpf_id, bpf_city_id, bpf_user_id, bpf_date, city_name, city_departement, city_poi_id, dpt_name, city_province_id, province_name, city_lat, city_long, user_email, user_name
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
    SELECT bpf_id, bpf_city_id, bpf_user_id, bpf_date, city_name, city_departement, city_poi_id, dpt_name, city_province_id, province_name, city_lat, city_long, user_email, user_name
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
    const { userId, city } = params;

    const queryCity = "SELECT city_id FROM cities WHERE city_name LIKE ?";
    const queryDeleteOne = `DELETE FROM bpfs
    WHERE bpf_user_id=? AND bpf_city_id=?`;
    const queryDeleteBcn = `DELETE FROM bcns
    WHERE bcn_user_id=? AND bcn_city_id=?`;

    sql.query(queryCity, [city])
        .then((res) => {
            const cityId = res[0].city_id;
            const promise1 = sql.query(queryDeleteOne, [userId, cityId]);
            const promise2 = sql.query(queryDeleteBcn, [userId, cityId]);
            Promise.all([promise1, promise2])
                .then((res) => result(null, res))
                .catch((err) => result(err, null));
        })
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

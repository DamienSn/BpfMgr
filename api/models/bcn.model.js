const sql = require("./db");
const { promisify } = require("util");

sql.query = promisify(sql.query);

/**
 * Create a BCN into DB
 * @param {*} params
 * @param {*} result
 */
module.exports.create = (params, result) => {
    const { bpfId, userId, dpt, cityId } = params;

    const query ="INSERT INTO bcns(bcn_bpf_id, bcn_city_id, bcn_user_id, bcn_dpt) VALUES (?, ?, ?, ?)";

    sql.query(query, [bpfId, cityId, userId, dpt])
        .then((res) => result(null, res))
        .catch((err) => result(err, null));
};

/**
 * Delete one BCN from the db
 * @param {*} params
 * @param {*} result
 */
module.exports.delete = (params, result) => {
    const { userId, city } = params;

    const queryCity =
        "SELECT city_id, bpf_id FROM cities INNER JOIN bpfs ON city_id=bpf_city_id WHERE city_name LIKE ?";
    const queryDeleteOne = `DELETE FROM bcns
    WHERE bcn_user_id=? AND bcn_bpf_id=?`;
    const queryDeleteBpf = `DELETE FROM bpfs
    WHERE bpf_user_id=? AND bpf_id=?`;

    sql.query(queryCity, [city]) 
        .then((res) => {
            const bpfId = res[0].bpf_id;
            const promise1 = sql.query(queryDeleteOne, [userId, bpfId]);
            const promise2 = sql.query(queryDeleteBpf, [userId, bpfId]);
            Promise.all([promise1, promise2])
                .then((res) => result(null, res))
                .catch((err) => result(err, null));
        })
        .catch((err) => result(err, null));
};

/**
 * Get all BCNs of an user (from db)
 * @param {*} params
 * @param {*} result
 */
module.exports.getAllByUser = (params, result) => {
    let { id } = params;
    id = parseInt(id);

    const queryGetAllByUser = `
    SELECT bcn_bpf_id, bcn_user_id, bpf_date, city_name, city_departement, dpt_name, city_province_id, province_name, city_lat, city_long, user_email, user_name
    FROM bcns
    INNER JOIN bpfs ON bcn_bpf_id=bpf_id
    INNER JOIN cities ON bpf_city_id=city_id
    INNER JOIN users ON bpf_user_id=user_id
    INNER JOIN provinces ON city_province_id=province_id
    INNER JOIN departements ON city_departement=dpt_id
    WHERE bcn_user_id=?`;

    sql.query(queryGetAllByUser, id)
        .then((res) => result(null, res))
        .catch((err) => result(err, null));
};

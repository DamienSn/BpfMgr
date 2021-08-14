const sql = require("./db.js");
const {promisify} = require("util");
const { query } = require("./db.js");
const router = require("../routes/bpf.routes.js");

sql.query = promisify(sql.query);


/**
 * Create a BPF into DB
 * @param {object} params Query parameters
 * @param {*} result err; data;
 */
module.exports.create = (params, result) => {
    let {name, date, userId} = params;

    const queryInsert = `INSERT INTO bpfs(id, user, date)
    VALUES(?, ?, ?)`;

    const querySelectCity = `SELECT id FROM cities
    WHERE name LIKE "%${name}%"`;

   sql.query(querySelectCity)
   .then(
       (res) => {
           const cityId = res[0].id;
           sql.query(queryInsert, [cityId, userId, date])
           .then(
               res => {
                   result(null, res);
               }
           )
           .catch(err => {
               result(err, null);
           })
       }
   )
   .catch(err => {
       result(err, null);
   })

}

/**
 * Get a bpf from DB
 * @param {Object} params 
 * @param {Function} result 
 */
module.exports.getOne = (params, result) => {
    const {id, date} = params;

    const queryGetOne = `SELECT * FROM bpfs*
    WHERE id=${id}
    OR date=${date}`;

    sql.query(queryGetOne)
    .then(res => result(null, res))
    .catch(err => result(err, null));
}

/**
 * Select bpfs of user in DB
 * @param {number} id Id of the user
 * @param {*} result 
 */
module.exportsGetAllByUser = (id, result) => {

    const queryGetAllByUser = `SELECT * FROM bpfs
    WHERE id=?`

    sql.query(queryGetAllByUser, id)
    .then(res => result(null, res))
    .catch(err => result(err, null));
}

/**
 * Delete a bpf from the DB
 * @param {Object} params query parameters
 * @param {*} result 
 */
module.exports.deleteOne = (params, result) => {
    const {userId, cityId} = params;

    const queryDeleteOne = `DELETE FROM bpfs
    WHERE user=? AND id=?`;

    sql.query(queryDeleteOne, [userId, cityId])
    .then(res => result(null, res))
    .catch(err => result(err, null));
}

/**
 * Delete all bpfs of an user from the DB
 * @param {number} userId User id
 * @param {*} result 
 */
module.exports.deleteAllByUser = (userId, result) => {
    const queryDeleteAll = `DELETE from bpfs
    WHERE user=?`;

    sql.query(queryDeleteAll, userId)
    .then(res => result(null, res))
    .catch(err => result(err, null));
}
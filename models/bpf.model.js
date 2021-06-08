const sql = require("./db.js");
const {promisify} = require("util");
const { query } = require("./db.js");

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
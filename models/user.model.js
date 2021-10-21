// Use connection define in db.js
const { query } = require("./db.js");
const sql = require("./db.js");
const bcrypt = require('bcrypt');

const User = function (user) {
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
    this.bio = user.bio;
    this.permissions = user.permissions;
};

async function crypt(str) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(str, salt);
}

// Create a new user
User.create = async (user, result) => {
    let data = {
        user_password: user.password,
        user_email: user.email,
        user_name: user.name,
        user_permissions: user.permissions
    }
    data.user_password = await crypt(data.user_password);
    data.user_verification_code = randomCode();
    data.user_verified = false;
    sql.query("INSERT INTO users SET ?", data, (err, res) => {
        if (err) {
            console.error("There were un error during creating user " + err);
            result(err, null);
            return;
        }

        result(null, { message: `User ${user.email} created succesfully`, data: {user_verification_code: data.user_verification_code} });
    });
};

// Get all users
User.getAll = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.error("There were un error during getting all users " + err);
            result(err, null);
            return;
        }

        result(null, res);
    });
};

// Delete an user with id
User.delete = (id, result) => {
    sql.query(
        `DELETE FROM users WHERE user_id=? AND NOT user_permissions='adm'`,
        id,
        (err, res) => {
            if (err) {
                result("There were an error during deleting user " + err, null);
                return;
            }

            console.log(res);
            if (res.affectedRows === 0) {
                result(null, "Cannot delete admin");
                return;
            }
            result(null, `User deleted ${id} succesfully`);
        }
    );
};

// Get an user by ID
User.getOne = async (id) => {
    return new Promise((resolve, reject)=>{
        sql.query(`SELECT * FROM users WHERE user_id=${id}`, (err, res) => {
            if (err) {
                return reject("There were an error : " + err);
            }
            return resolve(res);
        });
    });
};

// Update an user by ID
User.update = async (id, user, result) => {
    console.log(user)
    sql.query(
        'UPDATE users SET user_email=?, user_password=?, user_name=?, user_bio=?, user_permissions=?, user_avatar=? WHERE user_id=?',
        [user.user_email, user.user_password, user.user_name, user.user_bio, user.user_permissions, user.user_avatar, id],
        (err, res) => {
            if (err) {
                result(null, 'There were an error during updating user (id=' + id + ') : ' + err);
                return;
            }
            result(null, {
                message: "success",
                data: res
            });
        }
    )
};

// Connect an user
User.connect = async (email, password) => {

    return new Promise((resolve, reject)=>{
        sql.query(`SELECT * FROM users WHERE user_email=?`, email,  async (error, results)=>{
            if(error){
                return reject(error);
            }

            // compare passwords
            const auth = await bcrypt.compare(password, results[0].user_password);

            if (auth) {
                return resolve(results);
            } else {
                return reject({message: 'incorrect password'});
            }
        });
    });
}

/**
 * Verifier le code de vérification de l'email
 * @param {string} code Code de vérification
 * @param {number | string} userId User ID
 * @param {Function} result 
 */
User.verifyEmail = async (code, userId, result) => {
    let dbCode = null;
    sql.query('SELECT user_verification_code FROM users WHERE user_id=?', [userId], async (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        dbCode = res[0].user_verification_code;

        const right = code == dbCode;
        if (right) {
            sql.query('UPDATE users SET user_verified=1 WHERE user_id=?', userId, (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                } else {
                    result(null, res);
                    return;
                }
            })
        } else {
            result('wrong code', null);
        }
    })
}

/**
 * Update password of an user itno the DB
 * @param {Object} param0 new password and user_id
 * @param {Function} result callback
 */
User.updatePassword = async ({password, email}, result) => {
    password = await crypt(password);
    sql.query('UPDATE users SET user_password=? WHERE user_email=?', [password, email], (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res);
            return;
        }
    })
}

module.exports = User;

function randomCode () {
    let code = [];
    for (let i=0; i<6; i++) {
        code.push(Math.floor(Math.random() * 10))
    }
    code = code.join('');
    code = parseInt(code);
    return code;
}


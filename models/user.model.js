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
    user.password = await crypt(user.password);
    sql.query("INSERT INTO users SET ?", user, (err, res) => {
        if (err) {
            console.error("There were un error during creating user " + err);
            result(err, null);
            return;
        }

        result(null, { message: `User ${user.email} created succesfully` });
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
        `DELETE FROM users WHERE id=? AND NOT permissions='adm'`,
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
User.getOne = async (id, result) => {

    return new Promise((resolve, reject)=>{
        sql.query(`SELECT * FROM users WHERE id=${id}`, (err, res) => {
            if (err) {
                return reject("There were an error : " + err);
            }
            return resolve(res);
        });
    });
};

// Update an user by ID
User.update = async (id, user, result) => {
    const encrypted = await crypt(user.password);
    sql.query(
        'UPDATE users SET email=?, password=?, name=?, bio=?, permissions=? WHERE id=?',
        [user.email, encrypted, user.name, user.bio, user.permissions, id],
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
        sql.query(`SELECT * FROM users WHERE email=?`, email,  async (error, results)=>{
            if(error){
                return reject(error);
            }

            // compare passwords
            const auth = await bcrypt.compare(password, results[0].password);

            if (auth) {
                return resolve(results);
            } else {
                return reject({message: 'incorrect password'});
            }
        });
    });
}

module.exports = User;

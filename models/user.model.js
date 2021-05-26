// Use connection define in db.js
const { query } = require("./db.js");
const sql = require("./db.js");

const User = function (user) {
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
    this.bio = user.bio;
    this.permissions = user.permissions;
};

// Create a new user
User.create = (user, result) => {
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
            console.error("There were un error during creating user " + err);
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
User.getOne = (id, result) => {
    sql.query("SELECT * FROM users WHERE id=?", id, (err, res) => {
        if (err) {
            result(null, "There were an error : " + err);
            return;
        }
        result(null, res);
    });
};

// Update an user by ID
User.update = (id, user, result) => {
    sql.query(
        'UPDATE users SET email=?, password=?, name=?, bio=?, permissions=? WHERE id=?',
        [user.email, user.password, user.name, user.bio, user.permissions, id],
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
User.connect = (email, password, result) => {
    sql.query(`SELECT * FROM users WHERE email=?`, email, (err, res) => {
        if(err) {
            result(null, 'Error : ' + err);
            return;
        }
        if(res[0].password == password) {
            result(null, {message: 'success', user_id: res[0].id});
        } else {
            result(null, {messsage: 'error: bad password'});
        }
    })
}

module.exports = User;

const User = require("../models/user.model.js");
const { randomPassword } = require("custom-password-generator");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty!",
        });
    }

    // Create an user
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        bio: req.body.bio,
        permissions: req.body.permissions,
    });

    // Save user in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).json({
                message:
                    err.message ||
                    "Some error occurred while creating the user.",
            });
        else res.status(200).json(data);
    });
};

exports.getAll = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty!",
        });
    }

    // Save Customer in the database
    User.getAll((err, data) => {
        if (err)
            res.status(500).json({
                message:
                    err.message ||
                    "Some error occurred while creating the user.",
            });
        else res.status(200).json(data);
    });
};

exports.delete = (req, res) => {
    res.status(400);

    User.delete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                message:
                    err.message || "An error occured while deleting user " + id,
            });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.getOne = (req, res) => {
    if (!req.params.id) {
        res.status(400).json({ message: "Query must have id in params" });
    }

    User.getOne(req.params.id)
        .then((r) => res.status(200).json({ message: "ok", data: r[0] }))
        .catch((err) => res.status(200).json({ message: "error", error: err }));
};

exports.update = (req, res) => {
    if (!req.body || !req.params.id) {
        res.status(400).json({
            message: "Must have body in request or id in path parameters",
        });
    }

    User.update(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                message: "An error occured while updating user : " + err,
            });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.connect = (req, res) => {
    console.log(req.query);
    if (!req.query.email || !req.query.password) {
        res.status(400).json({ message: "n-req-info" });
        return;
    }

    User.connect(req.query.email, req.query.password, (err, data) => {
        if (err) {
            res.status(500).message({
                message: "An error occured while connecting user" + err,
            });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.verifyEmail = (req, res) => {
    if (!req.query.userId || !req.query.code) {
        res.status(400).json({ message: "Missing code or uid" });
        return;
    }

    User.verifyEmail(req.query.code, req.query.userId, (err, data) => {
        if (err) res.status(200).json({ message: "error", error: err });
        res.status(200).json({ message: "ok", data });
    });
};

/**
 * Call the model to update password
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.resetPassword = (req, res) => {
    if (!req.query.email) {
        res.status(400).json({ message: "Missing password or email" });
        return;
    }

    let password = randomPassword();
    User.updatePassword({ password, email: req.query.email }, (error, data) => {
        if (error) res.status(200).json({ message: "error", error });
        res.status(200).json({ message: "ok", data: password });
    });
};

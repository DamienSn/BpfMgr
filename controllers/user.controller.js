const User = require("../models/user.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Customer
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        bio: req.body.bio,
        permissions: req.body.permissions,
    });

    // Save Customer in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the user.",
            });
        else res.status(200).send(data);
    });
};

exports.getAll = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Save Customer in the database
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the user.",
            });
        else res.status(200).send(data);
    });
};

exports.delete = (req, res) => {
    res.status(400);

    User.delete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "An error occured while deleting user " + id,
            });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.getOne = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ message: "Query must have id in params" });
    }

    User.getOne(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "Error occured while getting user : " + err,
            });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.update = (req, res) => {
    if (!req.body || !req.params.id) {
        res.status(400).send({
            message: "Must have body in request or id in path parameters",
        });
    }

    User.update(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "An error occured while updating user : " + err,
            });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.connect = (req, res) => {
    console.log(req.query)
    if (!req.query.email || !req.query.password) {
        res.status(400).send({ message: "There is not email or password" });
        return;
    }

    User.connect(req.query.email, req.query.password, (err, data) => {
        if (err) {
            res.status(500).message({
                message: "An error occured while connecting user" + err,
            });
        } else {
            res.status(200).send(data);
        }
    });
};

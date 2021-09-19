const bcnModel = require('../models/bcn.model');

/**
 * Call model to delete bcn
 * @param {*} req
 * @param {*} res
 */
 exports.deleteOne = (req, res) => {
    bcnModel.delete(req.body, (err, data) => {
        err
            ? res.status(200).json({ message: "error", error: err })
            : res.status(200).json({ message: "ok", data });
    });
};

/**
 * Call model to select bcn of user
 * @param {*} req
 * @param {*} res
 */
 exports.getAllByUser = (req, res) => {
    bcnModel.getAllByUser({id: req.query.id}, (err, data) => {
        err
            ? res.status(200).json({ message: "error", error: err })
            : res.status(200).json({ message: "ok", data });
    });
};

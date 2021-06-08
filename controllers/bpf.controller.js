const bpfModel = require('../models/bpf.model');

/**
 * Call model to create bpf into DB
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
    bpfModel.create(req.body, (err, data) => {
        if (err) {
            res.status(200).json({message: "error", error: err});
        } else {
            res.status(200).json({message: 'ok', data});
        }
    });
};

/**
 * Call model to get one bpf
 * @param {*} req 
 * @param {*} res 
 */
exports.getOne = (req, res) => {
    bpfModel.getOne(req.body, (err, data) => {
        err ?
        res.status(200).json({message: 'error', error: err})
        : res.status(200).json({message: 'ok', data})
    })
};

exports.getAllByUser = (req, res) => {};

exports.deleteOne = (req, res) => {};

exports.deleteAllByUser = (req, res) => {};

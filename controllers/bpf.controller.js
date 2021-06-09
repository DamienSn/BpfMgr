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

/**
 * Call model to select bpfs of user
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllByUser = (req, res) => {
    bpfModel.getAllByUser(req.query.id, (err, data) => {
        err ?
        res.status(200).json({message: 'error', error: err})
        : res.status(200).json({message: 'ok', data});
    })
};

/**
 * Call model to delete bpf
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteOne = (req, res) => {
    bpfModel.deleteOne(req.body, (err, data) => {
        err ?
        res.status(200).json({message: 'error', error: err})
        : res.status(200).json({message: 'ok', data});
    })
};

/**
 * Call model to delete all user's bpf
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteAllByUser = (req, res) => {
    bpfModel.deleteAllByUser(req.query.userId, (error, data) => {
        error ?
        res.status(200).json({message: 'error', error})
        : res.status(200).json({message: 'ok', data});
    })
};

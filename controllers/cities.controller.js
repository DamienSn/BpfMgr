const { query } = require('express');
const CitiesModel = require('../models/cities.model');

exports.getAll = (req, res) => {
    CitiesModel.getAll((err, data) => {
        if (err) {
            res.status(500).json({message: 'error', error: err});
        } else {
            res.status(200).json({message: 'ok', data});
        }

    })
}

exports.getOne = (req, res) => {

    let queryParams = req.body;

    CitiesModel.getOne(queryParams, (err, data) => {
        if (err) {
            res.status(500).json({message: 'error', error: err});
        } else {
            res.status(200).json({message: 'ok', data});
        }

    })
}
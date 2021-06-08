const { query } = require('express');
const CitiesModel = require('../models/cities.model');

exports.getAll = (req, res) => {
    const page = req.query.page;

    console.log(typeof page);

    CitiesModel.getAll(page, (err, data) => {
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
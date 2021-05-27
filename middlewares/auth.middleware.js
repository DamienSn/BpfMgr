const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const UserModel = require('../models/user.model.js');
const dotenv = require('dotenv').config({path: '../config/.env'});


// check if user is connected
module.exports.checkUser = (req, res, next) => {
    // get jwt token on cookies
    const token = req.cookies.jwt;
    if (token) {
        // verify token
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge: 1});
                next();
            }

            let user = await UserModel.getOne(decodedToken.id);
            res.locals.user = user[0];

            next();
        });
    } else {
        res.locals.user = null;
        next();
    }
}

/**
 * Log in an user for the fisrt time
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(200).json({message: 'no token'})
            } else {
                console.log(decodedToken.id);
                next();
            }
        })
    } else {
        res.status(200).json({message: 'no token'})
    }
}
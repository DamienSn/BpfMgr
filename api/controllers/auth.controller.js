const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 24 * 60 * 1000;
/**
 * Create a token with an id
 * @param {number} id id of the user
 * @returns token generated
 */
const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge,
    });
    return token;
};

/**
 * Log in an user
 * @param {*} req
 * @param {*} res
 */
exports.logIn = async (req, res, type) => {
    
    try {
        if (type !== "licence") {
            const { email, password } = req.body;
            const user = await User.connect(email, password).catch((error) => {
                res.status(200).send({ message: 'error', error });
            });
        } else {
            const { email, licence } = req.body;
            const user = await User.connectWithLicence({email, licence}).catch((error) => {
                res.status(200).send({ message: 'error', error });
            });
        }

        const token = createToken(user[0].user_id);
        res.cookie("jwt", token, { httpOnly: true, maxAge });
        res.status(200).send({
            message: "connected",
            user_id: user[0].id,
        });
    } catch (err) {
        // throw err;
    }
};

exports.logOut = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).send({ message: "logged out" });
};

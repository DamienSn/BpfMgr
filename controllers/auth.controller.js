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
exports.logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.connect(email, password).catch((error) => {
            res.status(200).send({message: 'error', error});
        });

        const token = createToken(user[0].id);
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
    console.log("log out");
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).send({ message: "logged out" });
};

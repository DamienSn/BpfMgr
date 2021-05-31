const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors.utils");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
    try {
        // Format de l'image
        if (
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg"
        ) {
            throw Error("invalid file");
        }

        // Taille de l'image
        if (req.file.size > 2000000) throw Error("max size");
    } catch (err) {
        console.error(err);
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
    }

    const fileName = req.body.name + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../../client/public/uploads/profils/${fileName}`
        )
    );

    res.status(200).send({message: 'ok'});
    registerInDB(fileName, req.body.user_id);
};

/**
 *
 * @param {string} fileName
 * @param {number} user_id
 */
function registerInDB(fileName, user_id) {
    let user = null;
    UserModel.getOne(user_id)
        .then((res) => {
            user = res[0];
            user.avatar = `./uploads/profils/${fileName}`;
            UserModel.update(user_id, user, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log("avatar update : success");
            });
        })
        .catch((err) => {
            throw err;
        });
}

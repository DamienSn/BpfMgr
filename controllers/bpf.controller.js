const bpfModel = require("../models/bpf.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const ExifImage = require("exif").ExifImage;
const { processExif } = require("../utils/exif.utils");

/**
 * Call model to create bpf into DB
 * @param {*} req
 * @param {*} res
 */
exports.create = (req, res) => {
    bpfModel.create(req.body, (err, data) => {
        if (err) {
            res.status(200).json({ message: "error", error: err });
        } else {
            res.status(200).json({ message: "ok", data });
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
        err
            ? res.status(200).json({ message: "error", error: err })
            : res.status(200).json({ message: "ok", data });
    });
};

/**
 * Call model to select bpfs of user
 * @param {*} req
 * @param {*} res
 */
exports.getAllByUser = (req, res) => {
    bpfModel.getAllByUser(req.query.id, (err, data) => {
        err
            ? res.status(200).json({ message: "error", error: err })
            : res.status(200).json({ message: "ok", data });
    });
};

/**
 * Call model to delete bpf
 * @param {*} req
 * @param {*} res
 */
exports.deleteOne = (req, res) => {
    bpfModel.deleteOne(req.body, (err, data) => {
        err
            ? res.status(200).json({ message: "error", error: err })
            : res.status(200).json({ message: "ok", data });
    });
};

/**
 * Call model to delete all user's bpf
 * @param {*} req
 * @param {*} res
 */
exports.deleteAllByUser = (req, res) => {
    bpfModel.deleteAllByUser(req.query.userId, (error, data) => {
        error
            ? res.status(200).json({ message: "error", error })
            : res.status(200).json({ message: "ok", data });
    });
};

/* ======== UPLOAD ======== */

exports.createByPhoto = (req, res) => {

        // Format de l'image
        if (
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg"
        ) {
            throw Error("invalid file");
        }

        // Taille de l'image
        if (req.file.size > 7000000000) throw Error("max size");

        // Store image
        const fileName = req.body.userId + ".jpg";

        pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../../client/public/uploads/bpfs/${fileName}`
            )
        ).then(() => {
            // Read exif of the image to know location
            new ExifImage(
                {
                    image: `${__dirname}/../../client/public/uploads/bpfs/${fileName}`,
                },
                function (error, exifData) {
                    if (error) console.log("Error: " + error.message);
                    else {
                        processExif(exifData)
                            .then((response) => {
                                // Get the date of the BPF
                                let date;

                                req.body.date === 'photo' ?
                                date = exifData.exif.DateTimeOriginal :
                                date = req.body.date

                                createBpfWherePhotoIsGood(response, req.body.userId, date)
                                .then(r => res.status(200).json({message: 'ok', data: r}))
                                .catch(e => res.status(200).json({message: 'error', error: e}))
                            })
                            .catch((err) => console.error(err));
                    }
                }
            );
        })
        .catch(err => console.error(err))
};

function createBpfWherePhotoIsGood (city, userId, date) {    
    return new Promise((resolve, reject) => {
        const data = {
            name: city.name,
            userId,
            date
        }

        bpfModel.create(data, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

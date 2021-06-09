const bpfModel = require("../models/bpf.model");
var ExifImage = require('exif').ExifImage;

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
    try {
        // Format de l'image
/*         if (
            req.file.detectedMimeType != "image/jpg" &&
            req.file.detectedMimeType != "image/png" &&
            req.file.detectedMimeType != "image/jpeg"
        ) {
            throw Error("invalid file");
        } */

        // Taille de l'image
/*         if (req.file.size > 7000000000) throw Error("max size");
 */
        console.log(req.body);

        processImg(req.body.file, req.body.userId, req.body.date);
    } catch (err) {
        console.error(err);
        return res.status(201).json({ err });
    }
};

function processImg(file, userId, date) {
    readGpsExif(file);
}

function readGpsExif(file) {
    console.log(typeof file);
    try {
        new ExifImage({ image: file }, function (error, exifData) {
            if (error) console.log("Error: " + error.message);
            else console.log(exifData); // Do something with your data!
        });
    } catch (error) {
        console.log("Error: " + error.message);
    }
}

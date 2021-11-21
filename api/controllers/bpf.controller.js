const bpfModel = require("../models/bpf.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const ExifImage = require("exif").ExifImage;
const { processExif } = require("../utils/exif.utils");
const { logger } = require("../logs/logger");
const csv = require("csv-parser");

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
        fs.createWriteStream(`${process.env.UPLOAD_DIR}/bpfs/${fileName}`)
    )
        .then(() => {
            // Read exif of the image to know location
            new ExifImage(
                {
                    image: `${process.env.UPLOAD_DIR}/bpfs/${fileName}`,
                },
                function (error, exifData) {
                    if (error) console.log("Error: " + error.message);
                    else {
                        processExif(exifData)
                            .then((response) => {
                                // Get the date of the BPF
                                let date;

                                req.body.date === "photo"
                                    ? (date = exifData.exif.DateTimeOriginal)
                                    : (date = req.body.date);

                                createBpfWherePhotoIsGood(
                                    response,
                                    req.body.userId,
                                    date
                                )
                                    .then((r) => {
                                        fs.unlink(
                                            `${process.env.UPLOAD_DIR}/bpfs/${fileName}`,
                                            (err) => {
                                                if (err) {
                                                    res.status(200).json({
                                                        message: "error",
                                                        error: err,
                                                    });
                                                } else {
                                                    res.status(200).json({
                                                        message: "ok",
                                                        data: r,
                                                    });
                                                }
                                            }
                                        );
                                    })
                                    .catch((e) => {
                                        fs.unlink(
                                            `${process.env.UPLOAD_DIR}/bpfs/${fileName}`,
                                            (err) => {
                                                if (err) {
                                                    res.status(200).json({
                                                        message: "error",
                                                        error: err,
                                                    });
                                                } else {
                                                    res.status(200).json({
                                                        message: "error",
                                                        error: e,
                                                    });
                                                }
                                            }
                                        );
                                    });
                            })
                            .catch((e) => {
                                fs.unlink(
                                    `${process.env.UPLOAD_DIR}/bpfs/${fileName}`,
                                    (err) => {
                                        if (err) {
                                            res.status(200).json({
                                                message: "error",
                                                error: err,
                                            });
                                        } else {
                                            res.status(200).json({
                                                message: "error",
                                                error: e,
                                            });
                                        }
                                    }
                                );
                            });
                    }
                }
            );
        })
        .catch((e) => {
           fs.unlink(
                `${process.env.UPLOAD_DIR}/bpfs/${fileName}`,
                (err) => {
                    if (err) {
                        res.status(200).json({
                            message: "error",
                            error: err,
                        });
                    } else {
                        res.status(200).json({
                            message: "error",
                            error: e,
                        });
                    }
                }
            );
        });
};

function createBpfWherePhotoIsGood(city, userId, date) {
    return new Promise((resolve, reject) => {
        const data = {
            name: city.city_name,
            userId,
            date,
        };

        bpfModel.create(data, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

/**
 * Takes a CSV and register corresponding bpfs and bcns
 * @param {*} req
 * @param {*} res
 */
exports.createByCsv = (req, res) => {
    // if (req.file.clientReportedMimeType != "text/csv") {
    //     throw new Error("invalid file");
    // }

    const fileName = `csv${req.body.userId}.csv`;
    const json = [];
    let output = [];

    pipeline(
        req.file.stream,
        fs.createWriteStream(`${process.env.UPLOAD_DIR}/bpfs/${fileName}`)
    ).then(() => {
        // Parse CSV
        fs.createReadStream(`${process.env.UPLOAD_DIR}/bpfs/${fileName}`)
            .pipe(csv({ separator: ";" }))
            .on("data", (data) => json.push(data))
            .on("end", () => {
                fs.unlink(`${process.env.UPLOAD_DIR}/bpfs/${fileName}`, (err) => {if (err) throw err});
                const state = new Promise((resolve, reject) => {
                    json.sort((a, b) => new Date(a.date) - new Date(b.date));
                    json.forEach((item, index, array) => {
                        // Verify date format
                        if (!item.date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
                            output.push(
                                `Non ajouté : ${item.ville} : date incorrecte`
                            );
                            if (array.length - 1 === index) resolve(array);
                        } else {
                            // Create bpf
                            bpfModel.create(
                                {
                                    name: item.ville,
                                    userId: req.body.userId,
                                    date: item.date,
                                },
                                (err, data) => {
                                    if (err) {
                                        if (err == "existing yet") {
                                            output.push(
                                                `Non ajouté : ${item.ville} : bpf déjà existant`
                                            );
                                        } else if (err == "no city found") {
                                            output.push(
                                                `Non ajouté : ${item.ville} : ville non trouvée (erreur de syntaxe)`
                                            );
                                        } else if (err.code == "ER_DUP_ENTRY") {
                                            if (array.length - 1 === index)
                                                resolve(array);
                                        } else {
                                            output.push(
                                                `Non ajouté : ${item.ville} : erreur`
                                            );
                                        }
                                    }
                                    if (array.length - 1 === index)
                                        resolve(array);
                                }
                            );
                        }
                    });
                });

                state.then((array) => {
                    output.push(
                        `${array.length - output.length}/${
                            array.length
                        } villes ajoutées`
                    );
                    res.status(200).json({ message: "ok", output });
                });
            });
    });
};

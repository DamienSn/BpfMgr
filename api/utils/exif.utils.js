const citiesModel = require("../models/cities.model");
const {logger} = require('../logs/logger');
const {convertDMSToDD} = require('../utils/coords.utils')

module.exports.processExif = async (exifData) => {

    return new Promise(async (resolve, reject) => {
        // Check if there is GPS data on the picture
        if (!exifData.gps.GPSLatitude || !exifData.gps.GPSLongitude) {
            reject("no gps data");
        }

        let { GPSLatitude: lat, GPSLongitude: long } = exifData.gps;
        // Convert DMS to DD
        if (Array.isArray(lat) && Array.isArray(long)) {
            lat = convertDMSToDD(lat[0], lat[1], lat[2], exifData.gps.GPSLatitudeRef)
            long = convertDMSToDD(long[0], long[1], long[2], exifData.gps.GPSLongitudeRef)
        }

        checkIfLocationIsBpf(lat, long)
            .then((city) => {
                resolve(city)
            })
            .catch((e) => {
                reject(e)
            });
    });
};

/**
 * Check if a location is a bpf
 * @param {number} lat
 * @param {number} long
 */
function checkIfLocationIsBpf(lat, long) {
    return new Promise((resolve, reject) => {
        citiesModel.getAll(null, (err, data) => {
            if (err) {
                logger.error(err)
                reject(err)
            } else {
                // Calculer la lat et long min et max
                const margin = 0.020;
                const coords = {
                    lat,
                    latMin: lat - margin,
                    latMax: lat + margin,
                    long,
                    longMin: long - margin,
                    longMax: long + margin,
                };

                let found = false;

                // Trouver la ville qui correspond
                data.forEach((city) => {
                    if (
                        city.city_lat >= coords.latMin &&
                        city.city_lat <= coords.latMax &&
                        city.city_long >= coords.longMin &&
                        city.city_long <= coords.longMax
                    ) {
                        found = true;
                        resolve(city);
                        return;
                    }
                });

                if (!found) {
                    reject('no city found :(');
                }
            }
        });
    });
}

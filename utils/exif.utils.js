const citiesModel = require("../models/cities.model");

module.exports.processExif = async (exifData) => {

    return new Promise(async (resolve, reject) => {
        // Check if there is GPS data on the picture
        if (!exifData.gps.GPSLatitude || !exifData.gps.GPSLongitude) {
            reject("no gps data");
        }

        const { GPSLatitude: lat, GPSLongitude: long } = exifData.gps;

        checkIfLocationIsBpf(lat, long)
            .then((city) => resolve(city))
            .catch((e) => reject(e));
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
                console.error(err);
            } else {
                // Calculer la lat et long min et max
                const margin = 0.005;
                const coords = {
                    lat,
                    latMin: lat - margin,
                    latMax: lat + margin,
                    long,
                    longMin: long - margin,
                    longMax: long + margin,
                };

                // Trouver la ville qui correspond
                data.forEach((city) => {
                    if (
                        city.lat >= coords.latMin &&
                        city.lat <= coords.latMax &&
                        city.long >= coords.longMin &&
                        city.long <= coords.longMax
                    ) {
                        resolve(city);
                    }
                });
            }
        });
    });
}

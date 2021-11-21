const { accessLogger } = require("../logs/logger");

const logRequests = (req, res, next) => {
    accessLogger.access(`${req.method} ${req.originalUrl}`)
    next();
}

module.exports = logRequests;
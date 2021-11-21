const winston = require("winston");
const fs = require("fs");

const LEVEL = Symbol.for("level");

const logFormat = winston.format.printf(
    ({ level, message, timestamp, stack }) => {
        return `[${timestamp}] | {${level}}: ${stack || message}`;
    }
);

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: __dirname + "/combined.log",
            level: "debug",
        }),
        new winston.transports.File({
            filename: __dirname + "/error.log",
            level: "error",
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                logFormat
            ),
            level: "debug",
        }),
    ],
});

const accessLogger = winston.createLogger({
    levels: {
        "access": 0
    },
    level: "access",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: __dirname + "/access.log",
        }),
    ],
});

module.exports = {logger, accessLogger};

const winston = require('winston');

const logger = winston.createLogger({
    level: 'debug', // Cấp độ log
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' }),
    ],
});

module.exports = logger;
const winston = require('winston');

module.exports = class Logger {

    _app = null;

    _logger = null;

    constructor(app) {
        this._app = app;

        this._init();
    }

    log(value) {
        this._logger.log('debug', value);
    }

    info(value) {
        this._logger.info(value);
    }

    warn(value) {
        this._logger.log(value);
    }

    error(value) {
        this._logger.log('error', value);
    }

    _init(config) {
        const options = {
            level: 'debug',
            format: winston.format.json(),
            // defaultMeta: { service: 'user-service' },
            transports: [],
        };

        if (this._app.config.log.writeToFile) {
            options.transports.push(new winston.transports.File({ filename: this._app.config.log.writeToFile }))
        }

        this._logger = winston.createLogger(options);

        //
        // If we're not in production then log to the `console` with the format:
        // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
        //
        if (this._app.config.log.writeToConsole) {
            this._logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }
    }
}




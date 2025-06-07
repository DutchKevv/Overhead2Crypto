import winston, { transports, createLogger, format } from "winston";
import { App } from "../app";

export class Logger {

    #logger: winston.Logger

    constructor(private app: App) {
        this.#init();
    }

    log(value) {
        this.#logger.log('debug', value);
    }

    info(value) {
        this.#logger.info(value);
    }

    warn(value) {
        this.#logger.log(value);
    }

    error(value) {
        this.#logger.log('error', value);
    }

    #init() {
        const options: any = {
            level: 'debug',
            format: format.json(),
            // defaultMeta: { service: 'user-service' },
            transports: [],
        };

        if (this.app.config.log.writeToFile) {
            options.transports.push(new transports.File({ filename: this.app.config.log.writeToFile }))
        }

        this.#logger = createLogger(options);

        //
        // If we're not in production then log to the `console` with the format:
        // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
        //
        if (this.app.config.log.writeToConsole) {
            this.#logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }
    }
}




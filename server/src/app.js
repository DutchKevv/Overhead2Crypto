const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./miners.controller');

module.exports = class App {

    config = {
        productionOnly: false,
        wallet: '47D8WQoJKydhTkk26bqZCVF7FaNhzRtNG15u1XiRQ83nfYqogyLjPMnYEKarjAiCz93oV6sETE9kkL3bkbvTX6nMU24CND8',
        autoStart: true,
        web: {
            enabled: true,
            port: 3000
        },
        log: {
            enabled: true,
            writeToFile: 'xmrlog.txt',
            level: 'debug',
            writeToConsole: false
        }
    };

    _app = null;

    _controller = new Controller({
        coins: [],
        system: {
            minCpu: 60,
            minRam: 80
        }
    });
    
    _initialized = false;

    get controller() {
        return this._controller;
    }

    constructor() {
        this._init();
    }

    start() {
        this._controller.start();
    }

    stop() {
        this._controller.stop();
    }

    _init() {
        if (this.config.productionOnly) {
            console.info('Will only run in production')
        }

        if (this._initialized) {
            throw new Error('already _initialized');
        }

        this._initialized = true;

        // this._setupController();

        if (this.config.web.enabled) {
            this._setupWebServer();
        }

        this.controller.loadMiner('xmrig');
    }

    _setupWebServer() {
        this._app = express();
        this._app.use(express.static(path.join(__dirname, '../../public')));
        this._app.use(express.json()); //Used to parse JSON bodies
        this._app.use(bodyParser.urlencoded({ extended: true }));

        // Public API (status, settings etc)
        this._app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../client/src/html/index.html'));
        });

        this._app.get('/status', (req, res) => {
            res.send({
                system: this._controller._system,
                performance: this._controller.status
            });
        });

        this._app.post('/settings', (req, res) => {
            this._controller.updateSettings(req.body);
            res.sendStatus(200)
        });

        this._app.listen(this.config.web.port, () => {
            console.log(`Web app listening at http://localhost:${this.config.web.port}`)
        });
    }
}
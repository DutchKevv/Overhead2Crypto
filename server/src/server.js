const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./miners.controller');

module.exports = class App {

    _port = 3000;
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
        console.log(22)
        if (this._initialized) {
            throw new Error('already _initialized');
        }

        this._initialized = true;

        // this._setupController();
        this._setupWebServer();

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

        this._app.listen(this._port, () => {
            console.log(`Example app listening at http://localhost:${this._port}`)
        });
    }
}
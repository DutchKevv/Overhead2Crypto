const os = require('os');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PLATFORM = os.platform().toLowerCase();

const LINUX_PATH = path.join(__dirname, '../xmrig/linux/xmrig');
const WINDOWS_PATH = path.join(__dirname, '../xmrig/win/xmrig.exe');

module.exports = class XMRIGMiner {
    name = 'xmrig';

    _app = null;
    
    _initialized = false;

    _miner = null;

    _filePath = null;

    _running = false;

    _worker = null;

    _basePoolConfig = {
        "algo": null,
        "coin": "XMR",
        "url": "xmrpool.eu:9999",
        "user": "47D8WQoJKydhTkk26bqZCVF7FaNhzRtNG15u1XiRQ83nfYqogyLjPMnYEKarjAiCz93oV6sETE9kkL3bkbvTX6nMU24CND8",
        "pass": "x",
        "rig-id": null,
        "nicehash": false,
        "enabled": true,
        "keepalive": true,
        "tls": true,
        "tls-fingerprint": null,
        "daemon": false,
        "socks5": null,
        "self-select": null,
        "submit-to-origin": false
    };

    constructor(app) {
        this._app = app;
        this._init();
    }

    async _init() {
        if (PLATFORM === 'linux') {
            this._loadLinux();
        }

        else if (PLATFORM === 'win32') {
            this._loadWindows();
        }

        else {
            throw new Error('Unsopperted platform');
        }

        this._initialized = true;
    }

    start() {
        if (this._running) {
            console.info('XMRIG already running');
            return;
        }
        
        this._running = true;
        this._exec();
    }

    stop() {
        if (this._worker) {
            this._worker.kill();
            this._worker = null;
        }
    }

    getStatus() {

    }

    _loadLinux() {
        // add execution rights
        fs.chmodSync(LINUX_PATH, 754);

        this._filePath = LINUX_PATH;
    }

    _loadWindows() {
        this._filePath = WINDOWS_PATH;
    }

    _exec() {
        this._updateConfig();

        // start script
        this._worker = spawn(this._filePath, []);

        // passthrough output
        this._worker.stdout.on('data', data => this._app.logger.info(data));
        this._worker.stderr.on('data', data => this._app.logger.error(data));
    }

    _updateConfig() {
        // merge given pools config with base configs
        const pools = this._app.config.pools.map(poolConfig => Object.assign({}, this._basePoolConfig, poolConfig))
        
        this._app.logger.info('XMRIG pools configuration');
        this._app.logger.info(JSON.stringify(pools, null, 2));
        
        const winConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../xmrig/win/config.json')));
        const linuxConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../xmrig/linux/config.json')));

        winConfig.pools = pools;
        linuxConfig.pools = pools;

        fs.writeFileSync(path.join(__dirname, '../xmrig/win/config.json'), JSON.stringify(winConfig, null, 2));
        fs.writeFileSync(path.join(__dirname, '../xmrig/linux/config.json'), JSON.stringify(linuxConfig, null, 2));
    }
}


const os = require('os');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

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

    async stop() {
        this._running = false;
        // await miner.stop()
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
        const winConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../xmrig/win/config.json')));
        winConfig.pools[0].user = this._app.config.wallet;
        winConfig.pools[0].url = this._app.config.url;

        const linuxConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../xmrig/linux/config.json')));
        linuxConfig.pools[0].user = this._app.config.wallet;
        linuxConfig.pools[0].url = this._app.config.url;

        console.log(this._app.config.wallet)
        fs.writeFileSync(path.join(__dirname, '../xmrig/win/config.json'), JSON.stringify(winConfig));
        fs.writeFileSync(path.join(__dirname, '../xmrig/linux/config.json'), JSON.stringify(linuxConfig));

        // start script
        this._worker = exec(this._filePath + ` --user=${this._app.config.wallet}`);
        // const myShellScript = exec(this._filePath + ` --user=${this._app.config.wallet}`);

        this._worker.stdout.on('data', (data) => {
            this._app.logger.info(data);
            // do whatever you want here with data
        });

        this._worker.stderr.on('data', (data) => {
            this._app.logger.error(data);
        });
    }

    stop() {
        if (this._worker) {
            this._worker.kill();
            this._worker = null;
        }
    }
}


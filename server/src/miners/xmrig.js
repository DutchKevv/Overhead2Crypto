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

    stop() {
        this._running = false;

        if (this.worker) {
            this.worker.kill();
            this.worker = null;
        }
    }

    getStatus() {

    }

    _loadLinux() {
        // add execution rights
        fs.chmodSync(LINUX_PATH, 755);

        this._filePath = LINUX_PATH;

        const linuxConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../xmrig/linux/config.json')));
        linuxConfig.pools[0].user = this._app.config.wallet;
        linuxConfig.pools[0].url = this._app.config.url;
      
        fs.writeFileSync(path.join(__dirname, '../xmrig/linux/config.json'), JSON.stringify(linuxConfig));

        this._exec();
    }

    _loadWindows() {
        this._filePath = WINDOWS_PATH;

        const winConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../xmrig/win/config.json')));
        winConfig.pools[0].user = this._app.config.wallet;
        winConfig.pools[0].url = this._app.config.pools[0].url;

        fs.writeFileSync(path.join(__dirname, '../xmrig/win/config.json'), JSON.stringify(winConfig));

        this._exec();
    }

    _exec() {
        this.worker = exec(this._filePath + ` --user=${this._app.config.wallet}`);

        this.worker.stdout.on('data', (data) => {
            this._app.logger.info(data);
        });

        this.worker.stderr.on('data', (data) => {
            this._app.logger.error(data);
        });
    }
}


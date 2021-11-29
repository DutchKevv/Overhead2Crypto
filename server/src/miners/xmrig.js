const os = require('os');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PLATFORM = os.platform().toLowerCase();

const LINUX_PATH = path.join(__dirname, '../xmrig/linux/xmrig');
const WINDOWS_PATH = path.join(__dirname, '../xmrig/windows/xmrig');

module.exports = {
    name: 'xmrig',

    _initialized: false,

    _miner: null,

    _filePath: null,

    _running: false,

    async init() {
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
    },

    start() {
        if (this._running) {
            console.info('XMRIG already running');
            return;
        }
        
        this._running = true;
        this._exec();
    },

    async stop() {
        this._running = false;
        // await miner.stop()
    },

    getStatus() {

    },

    _loadLinux() {
        // add execution rights
        fs.chmodSync(LINUX_PATH, 755);

        this._filePath = LINUX_PATH;
    },

    _loadWindows() {
        this._filePath = WINDOWS_PATH;
    },

    _exec() {
        // start script
        const myShellScript = exec(this._filePath);

        myShellScript.stdout.on('data', (data) => {
            console.log(data);
            // do whatever you want here with data
        });

        myShellScript.stderr.on('data', (data) => {
            console.error(data);
        });
    }
}


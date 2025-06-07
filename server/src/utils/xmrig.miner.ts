import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { App } from '../app'
import { platform } from 'os';
import path, { join } from 'path';
import { chmodSync, readFileSync, writeFileSync } from 'fs';

const PLATFORM = platform().toLowerCase();

const XMRIG_PATH = join(__dirname, '../../../assets/miners/xmrig')
const LINUX_PATH = join(XMRIG_PATH, 'xmrig');
const WINDOWS_PATH = join(XMRIG_PATH, 'xmrig.exe');
const configPath = join(XMRIG_PATH, 'config.json')
const configBasePath = join(__dirname, '../../../config.base.json');

export class XMRIGMiner {
    name = 'xmrig';

    _initialized = false;

    _miner = null;

    _filePath: string;

    _running = false;

    _worker: ChildProcessWithoutNullStreams | null

    constructor(public app: App) {
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
        // chmodSync(LINUX_PATH, 754);

        this._filePath = LINUX_PATH;
    }

    _loadWindows() {
        this._filePath = WINDOWS_PATH;
    }

    _exec() {
        this._updateConfig();

        // start script
        this._worker = spawn(this._filePath, [], {cwd: XMRIG_PATH});

        // passthrough output
        this._worker.stdout.on('data', data => this.app.logger.info(data));
        this._worker.stderr.on('data', data => this.app.logger.error(data));
    }

    _updateConfig() {
   
        const configBase = JSON.parse(readFileSync(configBasePath, 'utf-8'));

        // merge given pools config with base configs
        const pools = this.app.config.pools?.map(poolConfig => Object.assign({}, configBase.pools[0], poolConfig))
        
        this.app.logger.info('XMRIG pools configuration');
        this.app.logger.info(JSON.stringify(pools, null, 2));

        configBase.pools = pools;
        Object.assign(configBase.opencl, this.app.config.opencl);
        Object.assign(configBase.cuda, this.app.config['cuda']);
             console.log(2323, configBase, XMRIG_PATH)

        writeFileSync(configPath, JSON.stringify(configBase, null, 2));
    }
}


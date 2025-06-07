import * as osu from 'node-os-utils';
import Table from 'cli-table';
import { App } from './app';
import { XMRIGMiner } from './utils/xmrig.miner'
import { CpuInfo, cpus, freemem } from 'os';

// const cpu = osu.cpu
// const mem = osu.mem

export class Controller {

    _active = false;

    _running = false;

    _settings = {
        maxCPU: 60,
        maxGPU: 60,
        maxRAM: 60,
        tickInterval: 2000
    };

    #miners: any = [];

    #tickInterval: any;

    #system: any = {
        cpu: [],
        cpuLoad: 0,
        freeMem: 0,
        ram: {}
    }

    _status = {
        coins: [
            {
                id: 'stratus',
                total: 0
            }
        ]
    }

    get status() {
        return {
            coins: [
                {
                    id: 'stratus',
                    total: 0
                }
            ],
            active: this._active
        }
    }

    constructor(private app: App) {
        this.app = app;
        this.init();
    }

    init() {
        
    }

    start() {
        if (this._running) {
            this.app.logger.info('Start: miner already running');
            return;
        }

        this.app.logger.info('Starting miner')
        this.#tickInterval = setInterval(() => this.tick(), this._settings.tickInterval);
        this._running = true;
    }

    stop() {
        this.app.logger.info('Stopping miner');

        clearInterval(this.#tickInterval);
        this.#tickInterval = null;
        this._running = false;
        this.#miners.forEach(miner => miner.stop());
    }

    reset() {

    }

    async tick() {
        // this.#system.cpuLoad = await cpu.usage();
        // this.#system.ram = await mem.info();
        this.#system.cpu = cpus() as CpuInfo[];
        this.#system.freeMem = freemem();

        // process.stdout.write('\x1b[H\x1b[2J')

        // instantiate
        var table = new Table({
            head: ['TH 1 label', 'TH 2 label']
            , colWidths: [100, 200]
        }) as any;

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        table.push(
            ['First value', 'Second value']
            , ['First value', 'Second value']
        );

        if (!this._active) {
            this._active = true;
            this.#miners.forEach(miner => miner.start());
        }

        // if (this._settings.maxCPU > this._system.cpuLoad) {
        //     this._active = true;

        // } else {
        //     this._active = false;
        // }

        // if (this._active) {
        //     this._miners.forEach(miner => miner.start());
        // } else {
        //     this._miners.forEach(miner => miner.stop());
        // }

        this._status.coins[0].total = 0;
    }

    updateSettings(settings) {
        Object.assign(this._settings, settings);
        console.log(this._settings)
    }

    loadMiner(name) {
        const miner = new XMRIGMiner(this.app);
        this.#miners.push(miner);
    }

    removeMiner(name) {
        const miner = this._getMiner(name);
        miner.stop();
    }

    pauseMiner(name) {
        this._getMiner(name).pause();
    }

    updateMiner(name, settings) {
        this._getMiner(name).update(settings);
    }

    _getMiner(name) {
        return this.#miners.find(miner => miner.name === name);
    }
}
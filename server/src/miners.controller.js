const os = require('os');
const osu = require('node-os-utils')
const cpu = osu.cpu
const mem = osu.mem
const Table = require('cli-table');

module.exports = class Controller {

    _app = null;

    _active = false;

    _running = false;

    _settings = {
        maxCPU: 60,
        maxGPU: 60,
        maxRAM: 60,
        tickInterval: 2000
    };

    _miners = [];

    _tickInterval = null;

    _system = {
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

    constructor(app) {
        this._app = app;
        this.init();
    }

    init() {
        
    }

    start() {
        if (this._running) {
            this._app.logger.info('Start: miner already running');
            return;
        }

        this._app.logger.info('Starting miner')
        this._tickInterval = setInterval(() => this.tick(), this._settings.tickInterval);
        this._running = true;
    }

    stop() {
        this._app.logger.info('Stopping miner');

        clearInterval(this._tickInterval);
        this._tickInterval = null;
        this._running = false;
        this._miners.forEach(miner => miner.stop());
    }

    reset() {

    }

    async tick() {
        this._system.cpuLoad = await cpu.usage();
        this._system.ram = await mem.info();
        this._system.cpu = os.cpus();
        this._system.freeMem = os.freemem();

        // process.stdout.write('\x1b[H\x1b[2J')

        // instantiate
        var table = new Table({
            head: ['TH 1 label', 'TH 2 label']
            , colWidths: [100, 200]
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        table.push(
            ['First value', 'Second value']
            , ['First value', 'Second value']
        );

        if (!this._active) {
            this._active = true;
            this._miners.forEach(miner => miner.start());
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
        const Miner = require(`./miners/${name}/${name}.miner.js`);
        const miner = new Miner(this._app);
        this._miners.push(miner);
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
        return this._miners.find(miner => miner.name === name);
    }
}
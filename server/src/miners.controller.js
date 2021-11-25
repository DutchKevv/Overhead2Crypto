const os = require('os');
const osu = require('node-os-utils')
const cpu = osu.cpu
const mem = osu.mem
var Table = require('cli-table');

module.exports = class Controller {

    _running = false;

    _settings = {
        maxCpu: 60,
        maxMem: 60,
        tickInterval: 2000
    };

    _miners = [];

    _tickInterval = null;

    _system = {
        cpuLoad: 0,
        freeMem: 0,
        ram: {}
    }

    constructor() {
        this.init();
    }

    init() {
        console.log(33)
    }

    start() {
        console.log(44)
        this._tickInterval = setInterval(() => this.tick(), this._settings.tickInterval);
        this._running = true;
    }

    stop() {
        clearInterval(this._tickInterval);
        this._tickInterval = null;
        this._running = false;
    }

    reset() {

    }

    async tick() {
        this._system.cpuLoad = await cpu.usage();
        this._system.ram = await mem.info();
        this._system.cpu = os.cpus();
        this._system.freeMem = os.freemem();

        // console.info({
        //     running: this._running,
        //     system: {
        //         cpu: `Load ${this._system.cpuLoad}%`,
        //         ram: `${this._system.ram.freeMemMb}mb of ${this._system.ram.totalMemMb}mb (${this._system.ram.usedMemPercentage}%)`
        //     }
        // });

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

        // console.log(table.toString());
    }

    updateSettings(settings) {
        Object.assign(this._settings, settings);
    }

    loadMiner(name) {
        const miner = require(`./miners/${name}`);
        miner.init();
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
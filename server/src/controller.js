const os = require('os');

module.exports = class Controller {

    _settings = {
        maxCpu: 60,
        maxMem: 60
    };

    _miners = [];

    constructor() {
        this.init();
    }

    init() {
        setTimeout(() => {
            this.tick();
        }, 3000)
    }

    tick() {
        console.log(os.cpus());
        console.log(os.totalmem());
        console.log(os.freemem())
    }

    updateSettings(settings) {
        Object.assign(this._settings, settings);
    }

    loadMiner(name) {
        const miner = require(`./miners/${name}`);
        miner.init();
        miner.start();
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
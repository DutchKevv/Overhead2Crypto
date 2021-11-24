const CoinHive = require('coin-hive');

module.exports = {
    name: 'coinhive',

    _initialized: false,
    _miner: null,

    async init() {
        if (this._initialized) {
            return;
        } 

        // Create miner
        this.miner = await CoinHive('ZM4gjqQ0jh0jbZ3tZDByOXAjyotDbo00'); // CoinHive's Site Key

        // Listen on events
        this.miner.on('found', () => console.log('Found!'));
        this.miner.on('accepted', () => console.log('Accepted!'));
        this.miner.on('update', data => {
            console.log(`Hashes per second: ${data.hashesPerSecond} Total hashes: ${data.totalHashes} Accepted hashes: ${data.acceptedHashes}`);
        });

        this._initialized = true;
    },

    start() {

    },

    async stop() {
        await miner.stop()
    },

    getStatus() {

    }
}
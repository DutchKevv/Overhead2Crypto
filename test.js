const { Miner } = require('./server/dist/index.js');

const miner = new Miner({
    pools: [{
        coin: 'XMR',
        user: '46Q5brYcfQ1AXxo1tBGohnXtimB2GzY9b37MU9FuLq28iSviK15TEUFApNhxTBNo9yKsCrrC46Y7MjQXHs7Y2mhF3yyqqiq',
        url: 'xmrpool.eu:9999', // optional pool URL,
    }],
    autoStart: false // optional delay
});

miner.start(); // optional manually start the miner
// miner.stop() // manually stop the miner
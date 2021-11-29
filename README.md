# OpenMiner

Mine cryptocurrencies [Monero (XMR)](https://getmonero.org/) from node.js (Linux/Windows).
Just include it into your project and make some extra money :)

# Without slowing down the machine

The mining software has a cpu-priority of 0, meaning it will ONLY use FREE / AVAILABLE RESOURCES

So you can safely include this package into your project, and make some extra money while the machines has free time.

Just try it out. Use the miner and continue using the machine.

# Easy setup

## Install

```
npm install open-miner
```

## Usage

```js
const Miner = require('overhead2crypto');

const miner = new Miner({
    wallet: '47D8WQoJKydhTkk26bqZCVF7FaNhzRtNG15u1XiRQ83nfYqogyLjPMnYEKarjAiCz93oV6sETE9kkL3bkbvTX6nMU24CND8'
});
```

# Web client

The library contains an easy to use web-overview (optional).
Just go to localhost:3000 and check your realtime stats.

# Config

```js
{
    // required
    wallet: '47D8WQoJKydhTkk26bqZCVF7FaNhzRtNG15u1XiRQ83nfYqogyLjPMnYEKarjAiCz93oV6sETE9kkL3bkbvTX6nMU24CND8',

    // optional
    productionOnly: false,
    web: {
        enabled: true,
        port: 3000
    },
    log: {
        enabled: true,
        level: 'debug',
        writeToFile: logFilePath,
        writeToConsole: false
    }
}
```



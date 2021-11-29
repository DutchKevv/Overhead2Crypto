# OpenMiner

Mine cryptocurrencies [Monero (XMR)](https://getmonero.org/) from node.js. Should be used as add-on into existing projects.

## Without slowing down your machine!!

The goal of this library is, to let the machine mine ONLY when there are free resources.. So you can use it without slowing down your machine :)

The mining software has a cpu-priority of 0, meaning it will ONLY use FREE / AVAILABLE RESOURCES

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

miner.start();
```

# Web client

The library contains an easy to use web-overview (optional).
Just go to localhost:3000 and check your stats

# Config

```js
{
    productionOnly: false,
    wallet: '47D8WQoJKydhTkk26bqZCVF7FaNhzRtNG15u1XiRQ83nfYqogyLjPMnYEKarjAiCz93oV6sETE9kkL3bkbvTX6nMU24CND8',
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



#### 05-12-2021 GPU Support
Added basic openCL en cuda support.

#### 04-12-2021 Configuration overhaul
Updated configuration settings, adding a lot of options.

#### 03-12-2021 Bug fix
The miner wasn't always starting with previous versions. Please update.

&#x200B;

```
npm install eazyminer
```

&#x200B;

# Easy Node Miner

Mine cryptocurrencies [Monero (XMR)](https://getmonero.org/) from **SERVERSIDE** node.js with C++ XMRIG.
**CPU + GPU** Support.

Works on **Linux** & **Windows**. Just include this npm module and make some extra coins :)

&#x200B;

# Without freezing down the machine

The mining software has a cpu-priority of 0, meaning it will ONLY use FREE / AVAILABLE RESOURCES

Just try it out. Use the miner and happily continue using the machine.

&#x200B;

# Why this package?

Other NPM modules turned out to either not work, being to complicated or have some funny stuff going on.
This package is made to be transparent, easy and FAST.

It can be used on:

&#x200B;

* CI/CD setups where the machines do nothing for a long period of time
* Webservers that don't have a lot of traffic.
* Webservers that are only busy during office hours
* On your day to day office....

&#x200B;

# Usage

```js
const Miner = require('eazyminer');

const miner = new Miner({
    pools: [{
        coin: 'XMR',
        user: '47D8WQoJKydhTkk26bqZCVF7FaNhzRtNG15u1XiRQ83nfYqogyLjPMnYEKarjAiCz93oV6sETE9kkL3bkbvTX6nMU24CND8',
        url: 'xmrpool.eu:9999', // optional pool URL,
    }],
    autoStart: false // optional delay
});

miner.start(); // optional manually start the miner
// miner.stop() // manually stop the miner
```

&#x200B;

# Config

```js
{
    // (XMRIG config options https://xmrig.com/docs/miner/config/pool)
    pools: [
        {
            coin: 'XMR',

            // wallet address
            user: "47D8WQoJKydhTkk26bqZCVF7FaNhzRtNG15u1XiRQ83nfYqogyLjPMnYEKarjAiCz93oV6sETE9kkL3bkbvTX6nMU24CND8",
            
            /**
             * optional
             */ 
            url: "xmrpool.eu:9999",
            pass: "x",
            algo: null,
            "rig-id": null,
            nicehash: false,
            enabled: true,
            keepalive: true,
            tls: true,
            "tls-fingerprint": null,
            daemon: false,
            socks5: null,
            "self-select": null,
            "submit-to-origin": false
        }
    ],

    /**
     * optional
     */

    // (XMRIG config options https://xmrig.com/docs/miner/config/opencl)
    opencl: {
        enabled: false,
        platform: 'AMD',
        loader: null,
        platform: "AMD",
        adl: true,
        "cn-lite/0": false,
        "cn/0": false
    },

    // (XMRIG config options https://xmrig.com/docs/miner/config/cuda)
    cuda: {
        enabled: false,
        loader: null,
        nvml: true,
        "cn-lite/0": false,
        "cn/0": false
    },

    // Run only when NODE_ENV is set to production
    // Set this to true, to not run the miner when in development mode (or testing etc)
    productionOnly: false,

    // Set to false to manually start the miner (for more control)
    autoStart: true,
    
    web: {
        
        // Enable or Disable web client
        enabled: true,

        // The used port for the webclient
        port: 3000 
    },
    log: {

        // Set to null to disable
        writeToFile: 'easyminer.txt',

        // Set to false to disable writing to console
        writeToConsole: true
    }
}
```

# Web client

The library contains an easy to use web-overview (optional).
Just go to localhost:3000 and check your realtime stats.

&#x200B;

# OpenCL support (GPU)

Make sure openCL is installed and you enable it in the config. 
Most graphic drivers include the openCL platform by default.

&#x200B;

# Cuda support (GPU)

Make sure cuda is installed and you enable it in the config.

&#x200B;

# Development

This is a fresh new package, so i'm making sure everything runs fine and not focusing to much on new features.
If you have ANY problem, please drop a bug report on Github. If there are enough people using this, I will start to invest heavily. 


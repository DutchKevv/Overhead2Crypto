#!/usr/bin/env node
import { program } from 'commander'
import { Miner } from './index'
import { IAppConfig } from './utils/interfaces'

program.option('-u, --user <char>', "", "")
program.parse()

const options = program.opts()
const config: IAppConfig = {
    pools: [{
        coin: 'XMR',
        user: '46Q5brYcfQ1AXxo1tBGohnXtimB2GzY9b37MU9FuLq28iSviK15TEUFApNhxTBNo9yKsCrrC46Y7MjQXHs7Y2mhF3yyqqiq',
        url: 'xmrpool.eu:9999', // optional pool URL,
    }],
}

if (options.user) {
    config.pools[0].user = options.user
}

new Miner(config)

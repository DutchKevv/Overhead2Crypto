import * as bodyParser from 'body-parser'
import merge from 'deepmerge'
import express from 'express'
import * as path from 'path'
import { Controller } from './miners.controller'
import { IAppConfig } from './utils/interfaces'
import { APP_DEFAULTS } from './utils/constants'
import { Logger } from './utils/logger'
import fetch from 'node-fetch';
import axios from 'axios'

export class App {
  config: IAppConfig
  logger: Logger

  #isProduction = (process.env.NODE_ENV || '').toLowerCase().startsWith('prod')
  #server: express.Application
  #initialized = false

  controller: any = null

  constructor(config: IAppConfig) {
    this.config = merge(APP_DEFAULTS, config || {})
    this.logger = new Logger(this)

    if (this.config.autoStart) {
      this.start()
    }
  }

  start() {
    if (!this.#initialized) {
      this._init()
    }

    this.controller?.start()
  }

  stop() {
    this.controller?.stop()
  }

  _init() {
    if (this.#initialized) {
      throw new Error('already initialized')
    }

    if (this.config.wallet) {
      this.logger.error(
        'Depricated eazyminer configuration. Please check https://www.npmjs.com/package/eazyminer for updated config options.',
      )
      this.logger.info('Not starting')

      return
    }

    if (this.config.productionOnly && !this.#isProduction) {
      this.logger.info('Eazy Miner config set to productionOnly. Not initializing')
      return
    }

    this.controller = new Controller(this)

    if (this.config.web.enabled) {
      this._setupWebServer()
    }

    this.controller.loadMiner('xmrig')

    this.#initialized = true
  }

  _setupWebServer() {
    this.#server = express()
    this.#server.use(express.static(path.join(__dirname, '../../public')))
    this.#server.use(express.json()) //Used to parse JSON bodies
    this.#server.use(bodyParser.urlencoded({ extended: true }))

    // Public API (status, settings etc)
    this.#server.get('/', (req, res) => res.sendFile('index.html'))

    this.#server.get('/status', (req, res) => {
      res.send({
        system: this.controller._system,
        performance: this.controller.status,
      })
    })

    this.#server.post('/settings', (req, res) => {
      this.controller.updateSettings(req.body)
      res.sendStatus(200)
    })

    this.#server.listen(this.config.web.port, () => {
      this.logger.info(`Webserver listening on port: ${this.config.web.port}`)
    })

    // axios.post('https://dlsignals.com/api/status', {}).catch(console.error)
  }
}

import { IAppConfig } from "./interfaces";

export const APP_DEFAULTS: IAppConfig = {
  productionOnly: false,
  autoStart: true,
  pools: [],
  opencl: {
    enabled: false,
    platform: 'AMD',
  },
  web: {
    enabled: true,
    port: 3000,
  },
  log: {
    enabled: true,
    writeToFile: 'xmrlog.txt',
    level: 'debug',
    writeToConsole: true,
  },
  wallet: null,
}

export interface IAppConfig {
  productionOnly?: boolean;
  autoStart?: boolean;
  pools?: any[]; // Consider replacing `any` with a more specific type if available
  opencl?: {
    enabled: boolean;
    platform: string;
  };
  web?: {
    enabled: boolean;
    port: number;
  };
  log?: {
    enabled: boolean;
    writeToFile: string;
    level: string;
    writeToConsole: boolean;
  };
  wallet?: any | null; // Replace `any` with specific type if known
}
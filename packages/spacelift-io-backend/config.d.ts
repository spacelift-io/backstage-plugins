export interface Config {
  spacelift: {
    hostUrl: string;
    apiKey: string;
    /**
     * @visibility secret
     */
    apiSecret: string;
    /**
     * If true, disables the ability to trigger runs. The plugin will be read-only.
     * @default false
     */
    readOnly?: boolean;
  };
}

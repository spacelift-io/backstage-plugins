export interface Config {
  /**
   * @visibility frontend
   */
  spacelift: {
    /**
     * @visibility frontend
     */
    hostUrl: string;
    /**
     * If true, disables the ability to trigger runs. The plugin will be read-only.
     * @visibility frontend
     * @default false
     */
    readOnly?: boolean;
  };
}

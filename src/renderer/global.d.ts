declare global {
  interface Window {
    api: {
      on: (channel: string, event: () => void) => void;
    };
  }
}
export default global;

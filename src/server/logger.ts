/* eslint-disable @typescript-eslint/no-explicit-any */

export const logger = {
  info: (message: string, metadata: Record<string, any>) => {
    console.log(message, metadata);
  },
  error: (message: string, metadata: Record<string, any>) => {
    console.error(message, metadata);
  },
  debug: (message: string, metadata: Record<string, any>) => {
    console.debug(message, metadata);
  },
  warn: (message: string, metadata: Record<string, any>) => {
    console.warn(message, metadata);
  },
};

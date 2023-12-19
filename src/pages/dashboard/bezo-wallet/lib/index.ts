import { P2pError } from './types';

export function resolveP2pErrorType(message: string) {
  if (message.match(/pin/)) {
    return P2pError.PIN;
  }
  if (message.match(/insufficient/)) {
    return P2pError.AMOUNT;
  }

  return P2pError.UNKNOWN;
}

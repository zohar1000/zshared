import { ZTime } from './ztime';

export const logt = (...args) => {
  console.log(ZTime.localUniDateTimeMs(), '==>', ...args);
};

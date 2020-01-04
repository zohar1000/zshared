import { TimeUtils } from './time.utils';

export const logt = (...args) => {
  const time = TimeUtils.getLocalCurrUniDateTime({ isMs: true });
  args.unshift(time + ' ==>');
  // @ts-ignore
  console.log.apply(this, args);
};

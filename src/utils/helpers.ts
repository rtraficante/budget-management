export const getPercentage = (last: number, now: number) => {
  return Math.ceil(((now - last) / ((now + last) / 2)) * 100);
};

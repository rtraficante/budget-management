export const getPercentage = (now: number, last: number) => {
  return Math.ceil(((now - last) / ((now + last) / 2)) * 100);
};

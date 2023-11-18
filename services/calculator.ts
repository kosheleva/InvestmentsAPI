
const sum = (values: number[]): number => {
  let sum: number = 0;
  values.map(v => sum = sum + v);

  return sum;
};

module.exports = {
  sum
};

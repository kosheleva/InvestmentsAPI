const { sum } = require("./../../services/calculator");

describe('Calculator tests', () => {
  describe('Tests', () => {
    test('Check if sum calculates correctly', () => {
      const values = [2.7, 5, 3];
      const result = sum(values);

      expect(result).toEqual(10.7);
    });
  });
});

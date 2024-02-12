import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 4, action: Action.Add });
    expect(result).toBe(6);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 5, action: Action.Subtract });
    expect(result).toBe(0);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 6, action: Action.Multiply });
    expect(result).toBe(18);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 32, b: 4, action: Action.Divide });
    expect(result).toBe(8);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 12, b: 2, action: 'invalid action' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: true,
      b: 'zero',
      action: Action.Subtract,
    });
    expect(result).toBeNull();
  });
});

// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 5, b: 4, action: Action.Multiply, expected: 20 },
  { a: 2, b: 12, action: Action.Multiply, expected: 24 },
  { a: 8, b: 4, action: Action.Multiply, expected: 32 },
  { a: 8, b: 4, action: Action.Divide, expected: 2 },
  { a: 40, b: 4, action: Action.Divide, expected: 10 },
  { a: 98, b: 2, action: Action.Divide, expected: 49 },
  { a: 98, b: 2, action: Action.Divide, expected: 49 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
  { a: true, b: 2, action: Action.Add, expected: null },
  { a: 'string', b: 10, action: Action.Subtract, expected: null },
  { a: [], b: 13, action: Action.Multiply, expected: null },
  { a: 9, b: 0, action: Action.Divide, expected: Infinity },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$a $action $b', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});

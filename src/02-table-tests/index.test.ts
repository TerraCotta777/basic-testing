// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: true, b: 2, action: Action.Subtract, expected: null },
  { a: 'string', b: 10, action: Action.Subtract, expected: null },
  { a: 9, b: 0, action: Action.Divide, expected: Infinity },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$a $action $b', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});

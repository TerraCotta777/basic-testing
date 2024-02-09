// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect.assertions(1);
    const data = await resolveValue('caffeine');
    expect(data).toBe('caffeine');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect.assertions(1);
    try {
      throwError('something went wrong');
    } catch (error) {
      expect(error).toEqual(Error('something went wrong'));
    }
  });

  test('should throw error with default message if message is not provided', () => {
    expect.assertions(1);
    try {
      throwError();
    } catch (error) {
      expect(error).toEqual(Error('Oops!'));
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect.assertions(1);
    try {
      throwCustomError();
    } catch (error) {
      expect(error).toEqual(new MyAwesomeError());
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);
    try {
      await rejectCustomError();
    } catch (error) {
      expect(error).toEqual(new MyAwesomeError());
    }
  });
});

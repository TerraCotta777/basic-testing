// Uncomment the code below and write your tests
import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    doStuffByTimeout(cb, 500);
    expect(setTimeout).toHaveBeenCalledWith(cb, 500);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 500);
    expect(cb).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const cb = jest.fn();
    doStuffByInterval(cb, 500);
    expect(setInterval).toHaveBeenCalledWith(cb, 500);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 500);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(5000);
    expect(cb).toHaveBeenCalledTimes(10);
  });
});

jest.mock('fs');
jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('index.ts');
    expect(pathSpy).toHaveBeenCalledWith(expect.any(String), 'index.ts');
    pathSpy.mockRestore();
  });

  const mockedExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;

  test('should return null if file does not exist', async () => {
    mockedExistsSync.mockReturnValue(false);
    const response = await readFileAsynchronously('file.txt');
    expect(response).toBeNull();
  });

  const mockedReadFile = readFile as jest.MockedFunction<typeof readFile>;

  test('should return file content if file exists', async () => {
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockImplementation(async () =>
      Buffer.from('my file content', 'utf-8'),
    );
    const fileContent = await readFileAsynchronously('test.txt');
    expect(fileContent).toBe('my file content');
  });
});

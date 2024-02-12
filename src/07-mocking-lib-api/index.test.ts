// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    (mockedAxios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: 'fetched user' }),
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('users/5');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.advanceTimersByTime(6000);
    await throttledGetDataFromApi('/users/5');
    expect(mockedAxios.create().get).toHaveBeenCalledWith('/users/5');
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('/users/5');
    expect(data).toBe('fetched user');
  });
});

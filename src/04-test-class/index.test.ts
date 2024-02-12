// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  let account: BankAccount;

  test('should create account with initial balance', () => {
    account = getBankAccount(99);
    expect(account.getBalance()).toBe(99);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountRecipient = getBankAccount(0);
    expect(() => account.transfer(100, accountRecipient)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(1);
    expect(account.getBalance()).toBe(100);
  });

  test('should withdraw money', () => {
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const accountRecipient = getBankAccount(20);
    account.transfer(10, accountRecipient);
    expect(accountRecipient.getBalance()).toBe(30);
    expect(account.getBalance()).toBe(40);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await account.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    } else return;
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(100);
    try {
      await bankAccount.synchronizeBalance();
      expect(bankAccount.getBalance()).not.toBe(100);
    } catch (error) {
      if (error instanceof SynchronizationFailedError)
        expect(error.message).toMatch(new SynchronizationFailedError().message);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});

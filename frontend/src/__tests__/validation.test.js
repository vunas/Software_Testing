import { validateUsername, validatePassword } from '../utils/validation';

test('username empty', () => {
  expect(validateUsername('')).toBe('Username is required');
});
test('password empty', () => {
  expect(validatePassword('')).toBe('Password is required');
});

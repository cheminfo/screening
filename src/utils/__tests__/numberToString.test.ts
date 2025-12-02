import { expect, test } from 'vitest';

import { numberToString } from '../numberToString.ts';

test('check 96 wells numberToString', () => {
  expect(numberToString(1)).toBe('A');
  expect(numberToString(26)).toBe('Z');
  expect(numberToString(27)).toBe('AA');
  expect(numberToString(78)).toBe('BZ');
});

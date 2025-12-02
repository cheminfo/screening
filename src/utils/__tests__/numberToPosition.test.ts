import { expect, test } from 'vitest';

import { numberToPosition } from '../numberToPosition.ts';

test('check 96 wells numberToPosition', () => {
  expect(numberToPosition(1, 12)).toBe('A1');
  expect(numberToPosition(12, 12)).toBe('A12');
  expect(numberToPosition(85, 12)).toBe('H1');
  expect(numberToPosition(96, 12)).toBe('H12');
});

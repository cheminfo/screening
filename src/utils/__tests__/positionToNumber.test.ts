import { expect, test } from 'vitest';

import { positionToNumber } from '../positionToNumber.ts';

test('check 96 wells positionToNumber', () => {
  expect(positionToNumber('A1', 12)).toBe(1);
  expect(positionToNumber('A12', 12)).toBe(12);
  expect(positionToNumber('H1', 12)).toBe(85);
  expect(positionToNumber('H12', 12)).toBe(96);
});

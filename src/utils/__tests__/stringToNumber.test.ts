import { expect, test } from 'vitest';

import { stringToNumber } from '../stringToNumber.ts';

test('check 96 wells stringToNumber', () => {
  expect(stringToNumber('A')).toBe(1);
  expect(stringToNumber('Z')).toBe(26);
  expect(stringToNumber('AA')).toBe(27);
  expect(stringToNumber('BZ')).toBe(78);
});

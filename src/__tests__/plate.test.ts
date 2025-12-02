import { expect, test } from 'vitest';

import { Plate } from '../plate.ts';

test('plate 2 x 3', () => {
  const plate = new Plate({ height: 2, width: 3 });

  expect(plate.wells).toHaveLength(6);
  expect(plate.size).toBe(6);
  expect(plate.width).toBe(3);
  expect(plate.height).toBe(2);
  expect(plate.wells[5]).toStrictEqual({
    number: 6,
    position: 'B3',
    info: {},
  });
});

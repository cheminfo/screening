import { expect, test } from 'vitest';

import { Plate } from '../plate.ts';

test('range', () => {
  const plate = new Plate();
  const wells = plate.wells;
  for (let i = 0; i < wells.length; i = i + 2) {
    wells[i].info = { reference: i };
  }

  plate.select('1-10 20 21 40-50');

  let selected = 0;
  for (const well of plate.wells) {
    if (well.selected) selected++;
  }

  expect(selected).toBe(11);
});

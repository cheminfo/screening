import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { generateIconNMRFileFromPlate } from '../generateIconNMRFileFromPlate.ts';

test('Generate iconNMR text file from plates', () => {
  const requests = JSON.parse(
    readFileSync(join(import.meta.dirname, './data/iconnmrPlate.json'), 'utf8'),
  );

  const options = {
    eol: '\r\n',
    plateNumber: 1,
    deleteExistingHolder: false,
  };

  const result = generateIconNMRFileFromPlate(requests, options);

  expect(result).toMatchSnapshot();
});

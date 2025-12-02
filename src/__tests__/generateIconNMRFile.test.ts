import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { generateIconNMRFile } from '../generateIconNMRFile.ts';

test('Generate iconNMR text file', () => {
  const requests = JSON.parse(
    readFileSync(join(import.meta.dirname, './data/iconnmr.json'), 'utf8'),
  );

  const options = {
    eol: '\r\n',
    plateNumber: 1,
    deleteExistingHolder: false,
  };

  const result = generateIconNMRFile(requests, options);

  expect(result).toMatchSnapshot();
});

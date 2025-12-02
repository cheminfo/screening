import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { generateFile } from '../iconnmr.js';

describe('ICONNmr', () => {
  it('generateFile', () => {
    let requests = JSON.parse(
      readFileSync(join(__dirname, './file/iconnmr.json')),
    );

    let options = {
      eol: '\r\n',
      plateNumber: 1,
      deleteExistingHolder: false,
    };

    let result = generateFile(requests, options);

    expect(result).toMatchSnapshot();
  });
});

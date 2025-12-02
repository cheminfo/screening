import type { HolderRequest, PlateRequest } from './RequestsTypes.ts';
import type { GenerateIconNMRFileOptions } from './generateIconNMRFile.ts';
import { generateIconNMRFile } from './generateIconNMRFile.ts';
import { positionToNumber } from './utils/positionToNumber.ts';

// need to expand GenerateIconNMRFileOptions to add plateNumber
export type GenerateIconNMRFileFromPlateOptions = GenerateIconNMRFileOptions & {
  /**
   * Position of the plate if there is any
   * @default 1
   */
  plateNumber?: number;
};

/**
 * Generate iconNMR text file from requests with plate positions
 * @param requests - array of PlateRequest objects
 * @param options - options for generating the file
 * @returns iconNMR text file
 */
export function generateIconNMRFileFromPlate(
  requests: PlateRequest[],
  options: GenerateIconNMRFileFromPlateOptions = {},
): string {
  const { plateNumber = 1 } = options;

  const holderRequests: HolderRequest[] = [];

  for (const request of requests) {
    const { position, holder, experiments, ...rest } = request;
    const newHolder = holder ?? getHolder(position, plateNumber);
    let experimentNumber = getExperimentNumber(position);
    const experimentsWithHolder = [];
    for (const experiment of experiments) {
      experimentsWithHolder.push({
        experimentNumber: experimentNumber++,
        ...experiment,
      });
    }
    holderRequests.push({
      holder: newHolder,
      experiments: experimentsWithHolder,
      ...rest,
    });
  }
  return generateIconNMRFile(holderRequests, options);
}

function getHolder(position: string, plateNumber: number): number {
  return plateNumber * 100 + positionToNumber(position, 12);
}

function getExperimentNumber(position: string): number {
  return positionToNumber(position, 12) * 10;
}

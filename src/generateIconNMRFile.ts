import type { HolderRequest } from './RequestsTypes.ts';

export interface GenerateIconNMRFileOptions {
  /**
   * End of line character
   * @default '\r\n'
   */
  eol?: string;
  /**
   * Flag specifying if existing experiments should be deleted
   * @default false
   */
  deleteExistingHolder?: boolean;
  /**
   * Submit automatically
   * @default false
   */
  autoSubmit?: boolean;
}

/**
 * Generate iconNMR text file from requests
 * @param requests - array of PlateRequest objects
 * @param options - options for generating the file
 * @returns iconNMR text file
 */
export function generateIconNMRFile(
  requests: HolderRequest[],
  options: GenerateIconNMRFileOptions = {},
): string {
  const {
    eol = '\r\n',
    deleteExistingHolder = false,
    autoSubmit = false,
  } = options;
  const textFile = [];
  for (const request of requests) {
    let experimentNumberCounter = 1;
    const { holder } = request;
    if (deleteExistingHolder) {
      textFile.push(`USER ${request.user}`, `HOLDER ${holder}`, 'DELETE'); // this is required to delete already existing entries
    }
    textFile.push(`USER ${request.user}`, `HOLDER ${holder}`);
    if (!autoSubmit) textFile.push('NO_SUBMIT');
    textFile.push(`NAME ${request.name}`, `TITLE ${request.title}`);
    for (const experiment of request.experiments) {
      let experimentNumber =
        experiment.experimentNumber || experimentNumberCounter++;
      textFile.push(
        `EXPNO ${experimentNumber++}`,
        `SOLVENT ${experiment.solvent}`,
        `EXPERIMENT ${experiment.experiment}`,
      );
      if (experiment.parameters && experiment.parameters.length > 0) {
        const parameters = [];
        for (const parameter of experiment.parameters) {
          parameters.push(parameter.label, parameter.value);
        }
        textFile.push(`PARAMETERS ${parameters.join(',')}`);
      }
    }
    textFile.push('');
  }
  return textFile.join(eol);
}

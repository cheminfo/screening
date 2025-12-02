import { numberToString } from './numberToString.ts';

/**
 * Convert number like 5 to plate position 'A5'
 * @param number
 * @param width
 * @returns
 */
export function numberToPosition(number: number, width: number): string {
  if (width === undefined) {
    throw new Error('need to specify width for numberToPosition');
  }
  number--;
  return (
    numberToString(Math.floor(number / width) + 1) +
    String((number % width) + 1)
  );
}

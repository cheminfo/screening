import { stringToNumber } from './stringToNumber.ts';

/**
 * Convert plate position like 'A5' to 5
 * @param position
 * @param width
 * @returns number
 */
export function positionToNumber(position: string, width: number): number {
  if (width === undefined) {
    throw new Error('need to specify width for numberToPosition');
  }
  position = position.toUpperCase().replaceAll(/[^0-9A-Z]/g, '');
  const string = position.replace(/[0-9]+/, '');
  const number = Number(position.replace(/[A-Z]+/, ''));
  return (stringToNumber(string) - 1) * width + number * 1;
}

/**
 * Convert number like 1 to string like 'A'
 * @param number
 * @returns
 */
export function numberToString(number: number): string {
  let string = '';
  while (number !== 0) {
    string = String.fromCodePoint(((number - 1) % 26) + 65) + string;
    number = Math.floor((number - 1) / 26);
  }
  return string;
}

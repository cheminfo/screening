/**
 * Convert string like 'A' to number like 1
 * @param string
 * @returns
 */
export function stringToNumber(string: string): number {
  let number = 0;
  for (let i = 0; i < string.length; i++) {
    number *= 26;
    number += Number(string.codePointAt(i)) - 64;
  }
  return number;
}

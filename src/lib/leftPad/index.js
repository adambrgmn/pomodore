export default function leftPad(input, length, char) {
  const str = `${input}`;
  const strLength = str.length;

  if (strLength >= length) return str;

  const arr = str.split('');
  while (arr.length < length) {
    arr.unshift(char);
  }

  return arr.join('');
}

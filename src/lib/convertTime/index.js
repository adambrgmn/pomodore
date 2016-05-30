import leftPad from '../leftPad';

export default function convertTime(ms) {
  const min = leftPad(Math.floor((ms / 1000 / 60) % 60), 2, 0);
  const sec = leftPad(Math.floor((ms / 1000) % 60), 2, 0);

  return { min, sec };
}


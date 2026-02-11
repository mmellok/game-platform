export default function mix(a, x, y) {
  return x * (1 - a) + y * a;
}

export function getMixA(x, y, mix) {
  return (mix - x) / (y - x);
}

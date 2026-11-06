function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function vector(ra: number, dec: number): readonly [number, number, number] {
  const a = (finite(ra, -360, 360) * Math.PI) / 180,
    d = (finite(dec, -90, 90) * Math.PI) / 180;
  return [Math.cos(d) * Math.cos(a), Math.cos(d) * Math.sin(a), Math.sin(d)];
}
export function angularSeparation(
  ra1Deg: number,
  dec1Deg: number,
  ra2Deg: number,
  dec2Deg: number,
): number {
  const a = vector(ra1Deg, dec1Deg),
    b = vector(ra2Deg, dec2Deg),
    cross = Math.hypot(
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ),
    dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  return (Math.atan2(cross, dot) * 180) / Math.PI;
}

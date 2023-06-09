export function remainderCeil(
  total: number,
  unit: number,
  count: number
): number {
  const turn = unit * count;
  if (total <= turn) {
    return Math.floor(total / unit);
  } else {
    return remainderCeil(total - turn, unit, count);
  }
}

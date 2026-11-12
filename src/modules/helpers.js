export function isSafeMove([x, y]) {
  if (x > 9 || x < 0 || y > 9 || y < 0) {
    return false;
  }
  return true;
}

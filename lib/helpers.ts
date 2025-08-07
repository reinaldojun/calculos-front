export function parsePossibleDate(val: any) {
  if (!val) return "";
  if (Array.isArray(val)) {
    // array like [2025,8,6,13,16,54,710000000]
    const [y, m, d, h = 0, min = 0, s = 0] = val;
    try {
      const date = new Date(y, m - 1, d, h, min, s);
      return date.toLocaleString();
    } catch (e) {
      return String(val);
    }
  }
  // if it's already a string or number
  try {
    return new Date(val).toLocaleString();
  } catch (e) {
    return String(val);
  }
}
type QueryValue = string | string[];
type QueryObject = Record<string, QueryValue>;

export const toSearchParams = (obj: QueryObject) => {
    const p = new URLSearchParams();
    Object.entries(obj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => p.append(key, v));
      } else {
        p.set(key, value);
      }
    });
    return p;
  };
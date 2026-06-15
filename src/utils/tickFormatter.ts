  export const tickFormatter = (v: number): string => {
      if (v === 0) return '0';
      if (v >= 1_000_000_000) return `${+(v / 1_000_000_000).toFixed(1)}B`;
      if (v >= 1_000_000)     return `${+(v / 1_000_000).toFixed(1)}M`;
      if (v >= 1_000)         return `${+(v / 1_000).toFixed(1)}K`;
      return String(v);
    };
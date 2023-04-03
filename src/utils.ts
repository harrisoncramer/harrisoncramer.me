  export function basename(str: string, sep: string) {
    return str.slice(str.lastIndexOf(sep) + 1);
  }

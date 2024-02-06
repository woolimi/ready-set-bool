export const powerset = (set: Array<number>): Array<Array<number>> => {
  const cleanSet = [...new Set(set)];
  const nbElements = cleanSet.length;
  const caseTotal = 2 ** nbElements;
  const result: Array<Array<number>> = [];

  for (let index = 0; index < caseTotal; index++) {
    let s = [];
    for (let i = 0; i < nbElements; i++) {
      let isInclude = index & (1 << i);
      if (isInclude) {
        s.push(cleanSet[i]);
      }
    }
    result.push(s);
  }

  return result;
};

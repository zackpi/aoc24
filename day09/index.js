let raw = await Bun.file("day09/input").text();

let toBlocks = () => {
  let s = [];
  for (let i = 0; i < raw.length; i++) {
    let char = i & 1 ? -1 : (i / 2) | 0;
    for (let j = 0; j < raw[i]; j++) {
      s.push(char);
    }
  }
  return s;
};

let chksum = (s) => {
  let chk = 0;
  for (let k = 0; k < s.length; k++) {
    if (s[k] >= 0) chk += s[k] * k;
  }
  return chk;
};

let part1 = (() => {
  let s = toBlocks();
  for (let j = s.length - 1; j >= 0; j--) {
    let i = s.indexOf(-1);
    if (i >= j) break;
    let t = s[i];
    s[i] = s[j];
    s[j] = t;
  }
  return chksum(s);
})();
console.log("part1 =", part1);
// =6384282079460

let part2 = (() => {
  let s = toBlocks();
  for (let j = s.length - 1; j > 0; j--) {
    let v = s[j];
    if (v < 0) continue;
    let k = j;
    while (s[k] === v) k--;
    let bj = j - k;
    j = k + 1;

    let i = 0;
    let bi = 0;
    for (; i < j; i++) {
      if (s[i] < 0) bi++;
      else bi = 0;
      if (bi < bj) continue;

      i -= bi - 1;
      for (let k = 0; k < bj; k++) {
        s[i + k] = v;
        s[j + k] = -1;
      }
      break;
    }
  }
  return chksum(s);
})();
console.log("part2 =", part2);
// =6408966547049

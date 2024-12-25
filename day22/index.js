let raw = await Bun.file("day22/input").text();
let secrets = raw.split("\n").map(Number);

let next = (s) => {
  s = (s ^ (s << 6)) & 0xffffff;
  s = (s ^ (s >> 5)) & 0xffffff;
  s = (s ^ (s << 11)) & 0xffffff;
  return s;
};

let part1 = 0;
for (let x of secrets) {
  for (let i = 0; i < 2000; i++) x = next(x);
  part1 += x;
}
console.log("part1 =", part1);
// =19854248602

let bananas = {};
for (let x of secrets) {
  let a, b, c, d, e;
  let seen = {};

  a = x % 10;
  for (let i = 0; i < 2000; i++) {
    x = next(x);

    if (i === 0) b = x % 10;
    else if (i === 1) c = x % 10;
    else if (i === 2) d = x % 10;
    else {
      e = x % 10;
      let k = [b - a, c - b, d - c, e - d].join(",");
      [a, b, c, d] = [b, c, d, e];

      if (seen[k]) continue;
      seen[k] = true;
      bananas[k] = (bananas[k] || 0) + e;
    }
  }
}

let maxNanas = -Infinity;
let maxSeq = "";
for (let k in bananas) {
  if (bananas[k] > maxNanas) {
    maxNanas = bananas[k];
    maxSeq = k;
  }
}
let part2 = maxNanas;
console.log("part2 =", part2);
// =2223

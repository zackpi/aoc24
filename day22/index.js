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
let key = (s) => s.slice(-4).join(",");
for (let x of secrets) {
  let prev = 0;
  let seq = [];
  let seen = {};
  for (let i = 0; i < 2000; i++) {
    x = next(x);
    let price = x % 10;
    seq.push(price - prev);
    prev = price;

    if (i < 4) continue;
    let k = key(seq);
    if (seen[k]) continue;
    seen[k] = true;
    bananas[k] = (bananas[k] || 0) + price;
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
// =2218 (?????)
